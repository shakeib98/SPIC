/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { MerkleTree } from './merkletree';
import { PoseidonHasher } from './poseidonHasher';
import { Circle, Tree } from './app.schema';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const buildPoseidon = require('circomlibjs').buildPoseidon;
import { BigNumber, Contract, ethers } from 'ethers';
import SPIC_ABI from './contracts/SPIC.json';

// @ts-ignore
const snarkjs = require('snarkjs');
const path = require('path');

require('dotenv').config();

console.log('env ---', process.env.ALCHEMY_RPC, process.env.PRIVATE_KEY);
// const SPIC_ADDRESS = '0x82F2Ce19e0C1818412644C430b5a592EA738aD58'; // Rinkeby
const SPIC_ADDRESS = '0x07091125FF27b9f4fE312Ff4940cf3fEc36B38FB'; //Matic Mainnet
// const RPC_URL = "https://api.s0.ps.hmny.io"; //Harmony
const RPC_URL = process.env.ALCHEMY_RPC; //Rinkeby

@Injectable()
export class AppService {
  trees;
  provider;
  relayer;
  contract;
  spicRelayer;
  constructor(
    @InjectModel('Circle') private circleModel: Model<Circle>,
    @InjectModel('Tree') private treeModel: Model<Tree>,
  ) {
    this.provider = new ethers.providers.JsonRpcProvider(String(RPC_URL));
    console.log('provider --', process.env.PRIVATE_KEY);
    this.relayer = new ethers.Wallet(process.env.PRIVATE_KEY, this.provider);
    this.contract = new Contract(SPIC_ADDRESS, SPIC_ABI, this.provider);
    this.spicRelayer = this.contract.connect(this.relayer);

    this.trees = {};
  }

  getHello(): string {
    return 'Hello World!';
  }

  initializeTree = async () => {
    const poseidonJs = await buildPoseidon();
    const votingTree = new MerkleTree(
      3,
      'Voter Commitment',
      new PoseidonHasher(poseidonJs),
    );
    const identityTree = new MerkleTree(
      3,
      'Voter Identity',
      new PoseidonHasher(poseidonJs),
    );
    return {
      votingTree,
      identityTree,
      voterIndex: 0,
      votesIndex: 0,
      indexMapping: {},
    };
  };

  reconstructTree = async (circleID) => {
    try {
      console.log('circle id in reconstruct --', circleID);
      const getTree = await this.treeModel.findOne({ circleID });
      this.trees[circleID] = await this.initializeTree();
      console.log('treee --', this.trees);
      console.log('getTree --', getTree);
      if (!getTree) {
        return false;
      } else {
        getTree.IC.forEach((el) => {
          this.trees[circleID].identityTree.insert(el);
        });
        getTree.VN.forEach((el) => {
          this.trees[circleID].votingTree.insert(el);
        });
        this.trees[circleID].votesIndex = getTree.votesIndex;
        this.trees[circleID].voterIndex = getTree.voterIndex;
        this.trees[circleID].indexMapping = getTree.indexMapping;
        return true;
      }
    } catch (e) {
      throw e;
    }
  };

  castVote = async ({
    identityNullifier,
    trapdoor,
    secret,
    votingNullifier,
    CIRCLE_ID,
    contributer,
  }) => {
    try {
      if (!this.trees[CIRCLE_ID]) {
        const getResultTree = await this.reconstructTree(CIRCLE_ID);
        console.log('result --', getResultTree);
      }
      const poseidonJs = await buildPoseidon();

      await this.trees[CIRCLE_ID].votingTree.insert(votingNullifier);
      const res = await this.treeModel.findOne({ circleID: CIRCLE_ID });
      if (res) {
        const updatedRes = await this.treeModel.updateOne(
          { circleID: CIRCLE_ID },
          { $push: { VN: votingNullifier } },
        );
      } else {
        const doc = {
          circleID: CIRCLE_ID,
          VN: [votingNullifier],
          IC: [],
          indexMapping: this.trees[CIRCLE_ID].indexMapping,
        };
        const res = new this.treeModel(doc);
        await res.save();
      }
      const IC = poseidonJs.F.toObject(
        poseidonJs([identityNullifier, trapdoor, secret]),
      );
      console.log('generated IC ---', IC);
      console.log('mapping ---', this.trees[CIRCLE_ID].indexMapping);

      const { root, path_elements, path_index } = await this.trees[
        CIRCLE_ID
      ].identityTree.path(this.trees[CIRCLE_ID].indexMapping[String(IC)]);

      for (let i = 0; i < path_elements.length; i++) {
        path_elements[i] = BigNumber.from(path_elements[i]).toString();
      }

      const Input = {
        identityNullifier: identityNullifier,
        identityTrapdoor: trapdoor,
        secret: secret,
        merklePath: path_elements,
        pathIndices: path_index,
        mRoot: BigNumber.from(root).toString(),
      };

      console.log(Input, votingNullifier, CIRCLE_ID);

      const { proof, publicSignals } = await snarkjs.groth16.fullProve(
        Input,
        path.resolve('./src/identity_commitment.wasm'),
        path.resolve('./src/circuit_final.zkey'),
      );
      const solProof = {
        a: [proof.pi_a[0], proof.pi_a[1]],
        b: [
          [proof.pi_b[0][1], proof.pi_b[0][0]],
          [proof.pi_b[1][1], proof.pi_b[1][0]],
        ],
        c: [proof.pi_c[0], proof.pi_c[1]],
      };
      console.log('sol proof ===>', solProof);
      const proofForFunction = [
        `${solProof.a[0]}`,
        `${solProof.a[1]}`,
        `${solProof.b[0][0]}`,
        `${solProof.b[0][1]}`,
        `${solProof.b[1][0]}`,
        `${solProof.b[1][1]}`,
        `${solProof.c[0]}`,
        `${solProof.c[1]}`,
      ];
      console.log('console before ---', RPC_URL);
      // console.log('contract --', contract);
      console.log('spic relayer---', contributer);
      const maxFeePerGas = ethers.utils.parseUnits(60 + '', 'gwei');
      const maxPriorityFeePerGas = ethers.utils.parseUnits(57 + '', 'gwei');
      const txn = await this.spicRelayer.castVoteExternal(
        contributer,
        BigNumber.from(root).toString(),
        votingNullifier,
        CIRCLE_ID,
        proofForFunction,
        {
          gasLimit: 10000000,
          maxFeePerGas,
          maxPriorityFeePerGas,
        },
      );
      console.log('txn before --', txn);
      await txn.wait();
      this.trees[CIRCLE_ID].votesIndex = this.trees[CIRCLE_ID].votesIndex + 1;
      console.log('tree ---', this.trees[CIRCLE_ID]);
      this.trees[CIRCLE_ID].indexMapping[String(votingNullifier)] =
        this.trees[CIRCLE_ID].votesIndex - 1;
      await this.treeModel.findOneAndUpdate(
        { circleID: CIRCLE_ID },
        {
          $inc: { votesIndex: 1 },
          $set: { indexMapping: this.trees[CIRCLE_ID].indexMapping },
        },
      );
      await this.circleModel.findOneAndUpdate(
        { _id: CIRCLE_ID },
        { $inc: { votesCount: 1 } },
      );
      return txn;
    } catch (e) {
      throw e;
    }
  };

  becomeVoter = async ({ IC, CIRCLE_ID }): Promise<any> => {
    try {
      if (!this.trees[CIRCLE_ID]) {
        await this.reconstructTree(CIRCLE_ID);
      }
      // IC = BigInt(IC.toString());
      const res = await this.treeModel.findOne({ circleID: CIRCLE_ID });
      if (res) {
        const updatedRes = await this.treeModel.updateOne(
          { circleID: CIRCLE_ID },
          { $push: { IC: IC } },
        );
      } else {
        const doc = { circleID: CIRCLE_ID, VN: [], IC: [IC] };
        const res = new this.treeModel(doc);
        await res.save();
      }
      console.log('circle ---', CIRCLE_ID, IC);
      await this.trees[CIRCLE_ID].identityTree.insert(IC);
      this.trees[CIRCLE_ID].voterIndex = this.trees[CIRCLE_ID].voterIndex + 1;
      await this.treeModel.findOneAndUpdate(
        { circleID: CIRCLE_ID },
        { $inc: { voterIndex: 1 } },
      );
      const update = await this.circleModel.findOneAndUpdate(
        { _id: CIRCLE_ID },
        { $inc: { voterCount: 1 } },
      );
      console.log('update circle ---', update);
      console.log('tress ---', this.trees[CIRCLE_ID].identityTree);
      return { success: true };
    } catch (e) {
      throw e;
    }
  };

  withdraw = async ({ CIRCLE_ID, votingNullifier }): Promise<any> => {
    try {
      if (!this.trees[CIRCLE_ID]) {
        await this.reconstructTree(CIRCLE_ID);
      }
      console.log('mapping ---', this.trees[CIRCLE_ID].indexMapping);
      const { root, path_elements, path_index } = await this.trees[
        CIRCLE_ID
      ].votingTree.path(
        this.trees[CIRCLE_ID].indexMapping[String(votingNullifier)],
      );

      for (let i = 0; i < path_elements.length; i++) {
        path_elements[i] = BigNumber.from(path_elements[i]).toString();
      }
      return { root, path_elements, path_index };
    } catch (e) {
      throw e;
    }
  };

  saveIndex = async ({ IC, index, CIRCLE_ID }) => {
    try {
      if (!this.trees[CIRCLE_ID]) {
        await this.reconstructTree(CIRCLE_ID);
      }
      this.trees[CIRCLE_ID].indexMapping[String(IC)] = index;
      console.log('index maping ---', this.trees[CIRCLE_ID]);
      const tree = await this.treeModel.findOne({ circleID: CIRCLE_ID });
      const mapping = { [String(IC)]: index, ...tree.indexMapping };
      await this.treeModel.findOneAndUpdate(
        { circleID: CIRCLE_ID },
        { $set: { indexMapping: mapping } },
      );
    } catch (e) {
      throw e;
    }
  };

  getIndex = async ({ CIRCLE_ID }): Promise<any> => {
    try {
      if (!this.trees[CIRCLE_ID]) {
        await this.reconstructTree(CIRCLE_ID);
      }

      return {
        voterIndex: this.trees[CIRCLE_ID].voterIndex,
        votesIndex: this.trees[CIRCLE_ID].votesIndex,
      };
    } catch (e) {
      throw e;
    }
  };

  createCircle = async (params: any) => {
    try {
      console.log('params of create --', params);
      const res = new this.circleModel(params);
      await res.save();
      return res;
    } catch (e) {
      throw e;
    }
  };

  deleteCircle = async (params: any) => {
    try {
      const res = await this.circleModel.findOneAndDelete({ _id: params });
      return res;
    } catch (e) {
      throw e;
    }
  };

  addContributer = async (params: any) => {
    try {
      const res = await this.circleModel.findOneAndUpdate(
        { _id: params.id },
        { $push: { contributors: params.contributors } },
      );
      return res;
    } catch (e) {
      throw e;
    }
  };

  getAllCircles = async () => {
    try {
      const res = await this.circleModel.find();
      return res;
    } catch (e) {
      throw e;
    }
  };

  getCircleById = async (params: any) => {
    try {
      console.log('params ---', params);
      const res = await this.circleModel.findOne({ _id: params });
      return res;
    } catch (e) {
      throw e;
    }
  };

  getUserData = async (params: any) => {
    try {
      console.log('params --', params);
      const res = await this.circleModel.find({ adminAddress: params });
      console.log(res);
      return res;
    } catch (e) {
      throw e;
    }
  };
}
