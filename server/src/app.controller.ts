/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { BigNumber, Contract, ethers } from 'ethers';
import SPIC_ABI from './contracts/SPIC.json';
import POOL_ABI from './contracts/Pool.json';

// @ts-ignore
const snarkjs = require('snarkjs');
const path = require('path');
const buildPoseidon = require('circomlibjs').buildPoseidon;
const {
  DefenderRelaySigner,
  DefenderRelayProvider,
} = require('defender-relay-client/lib/ethers');

require('dotenv').config();

// const credentials = {
//   apiKey: process.env.DEFENDER_API_KEY,
//   apiSecret: process.env.DEFENDER_SECRET_KEY,
// };

// const provider = new DefenderRelayProvider(credentials);
// const signer = new DefenderRelaySigner(credentials, provider, {
//   validForSeconds: 120,
// });
console.log('env ---', process.env.ALCHEMY_RPC, process.env.PRIVATE_KEY);
// const SPIC_ADDRESS = '0x82F2Ce19e0C1818412644C430b5a592EA738aD58'; // Rinkeby
const SPIC_ADDRESS = '0x07091125FF27b9f4fE312Ff4940cf3fEc36B38FB'; //Matic Mainnet
// const RPC_URL = "https://api.s0.ps.hmny.io"; //Harmony
const RPC_URL = process.env.ALCHEMY_RPC; //Rinkeby
// let votingTree: Record<string, unknown> = {};
// let identityTree: Record<string, unknown> = {};

@Controller()
export class AppController {
  trees;
  indexMapping;
  provider;
  relayer;
  contract;
  spicRelayer;
  constructor(private readonly appService: AppService) {
    this.provider = new ethers.providers.JsonRpcProvider(String(RPC_URL));
    console.log('provider --', process.env.PRIVATE_KEY);
    this.relayer = new ethers.Wallet(process.env.PRIVATE_KEY, this.provider);
    this.contract = new Contract(SPIC_ADDRESS, SPIC_ABI, this.provider);
    this.spicRelayer = this.contract.connect(this.relayer);

    this.trees = {};
    this.indexMapping = {};
  }

  @Post()
  async castVote(
    @Body('nullifier') identityNullifier: string,
    @Body('trapdoor') trapdoor: string,
    @Body('secret') secret: string,
    @Body('contributer') contributer: string,
    @Body('votingNullifier') votingNullifier: bigint,
    @Body('CIRCLE_ID') CIRCLE_ID: string,
  ): Promise<any> {
    try {
      const poseidonJs = await buildPoseidon();

      await this.trees[CIRCLE_ID].votingTree.insert(votingNullifier);
      const IC = poseidonJs.F.toObject(
        poseidonJs([identityNullifier, trapdoor, secret]),
      );
      console.log('generated IC ---', IC);
      console.log('mapping ---', this.indexMapping);

      const { root, path_elements, path_index } = await this.trees[
        CIRCLE_ID
      ].identityTree.path(this.indexMapping[String(IC)]);

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
      this.indexMapping[String(votingNullifier)] =
        this.trees[CIRCLE_ID].votesIndex - 1;
      return txn;
      // return true
    } catch (e) {
      console.log('error ===>', e);
      throw e;
    }
  }

  @Post('becomeVoter')
  async becomeVoter(
    @Body('IC') IC: bigint,
    @Body('CIRCLE_ID') CIRCLE_ID: string,
  ): Promise<any> {
    try {
      IC = BigInt(IC.toString());

      if (!this.trees[CIRCLE_ID]) {
        this.trees[CIRCLE_ID] = await this.appService.initializeTree();
      }
      console.log('circle ---', CIRCLE_ID, IC);
      await this.trees[CIRCLE_ID].identityTree.insert(IC);
      this.trees[CIRCLE_ID].voterIndex = this.trees[CIRCLE_ID].voterIndex + 1;
      console.log('tress ---', this.trees[CIRCLE_ID].identityTree);
      // const rootSPIC = await this.spicRelayer.groups(CIRCLE_ID);
      // const { root, path_elements, path_index } = await this.trees[
      //   CIRCLE_ID
      // ].identityTree.path(0);

      // console.log('roots ---', BigNumber.from(root).toString());
      return {
        statusCode: 200,
        data: [],
      };
    } catch (e) {
      console.log('error ---', e);
      throw e;
    }
  }

  @Post('saveIndex')
  async saveIndex(
    @Body('IC') IC: bigint,
    @Body('index') index: string,
  ): Promise<any> {
    try {
      this.indexMapping[String(IC)] = index;
      console.log('mapping ---', this.indexMapping);

      return {
        statusCode: 200,
        data: [],
      };
    } catch (e) {
      console.log('error ---', e);
      throw e;
    }
  }

  @Post('withdraw')
  async withdraw(
    @Body('votingNullifier') votingNullifier: bigint,
    @Body('CIRCLE_ID') CIRCLE_ID: string,
  ): Promise<any> {
    try {
      console.log('mapping ---', this.indexMapping);
      const { root, path_elements, path_index } = await this.trees[
        CIRCLE_ID
      ].votingTree.path(this.indexMapping[String(votingNullifier)]);

      for (let i = 0; i < path_elements.length; i++) {
        path_elements[i] = BigNumber.from(path_elements[i]).toString();
      }

      return {
        statusCode: 200,
        data: [{ root, path_elements, path_index }],
      };
    } catch (e) {
      console.log('error ---', e);
      throw e;
    }
  }

  @Post('getIndex')
  async getIndex(@Body('CIRCLE_ID') CIRCLE_ID: string): Promise<any> {
    try {
      if (!this.trees[CIRCLE_ID]) {
        this.trees[CIRCLE_ID] = await this.appService.initializeTree();
      }

      return {
        statusCode: 200,
        data: [
          {
            voterIndex: this.trees[CIRCLE_ID].voterIndex,
            votesIndex: this.trees[CIRCLE_ID].votesIndex,
          },
        ],
      };
    } catch (e) {
      console.log('error ---', e);
      throw e;
    }
  }

  @Get()
  dummyRoute() {
    console.log('get request');
    return { data: 'hello' };
  }

  // @Post('zkpt')
  // async zkpt(@Body('proof') proof: any, @Body('args') args: any): Promise<any> {
  //   try {
  //     const contract = new Contract(
  //       '0xC8b59e543cc298dECa3965a0d6c8612951bd2F24',
  //       POOL_ABI,
  //       signer,
  //     );
  //     console.log(...[...args.slice(2, 7)], args[0]);
  //     console.log('testing');
  //     const tx = await contract.withdraw(
  //       proof,
  //       ...[...args.slice(2, 7), args[0]],
  //       {},
  //     );
  //     console.log({ tx });
  //     const txReciept = await tx.wait();
  //     console.log({ txReciept });
  //     return {
  //       statusCode: 200,
  //       data: [txReciept],
  //     };
  //   } catch (e) {
  //     console.log('error ---', e);
  //     throw e;
  //   }
  // }
}
