import { expect, use } from "chai";
import { ethers} from "hardhat";
import { deployContract } from "ethereum-waffle";

import * as ERC20Artifact from "../artifacts/contracts/base/ERC20Mock.sol/MockERC20.json"
import * as ERC721Artifact from "../artifacts/contracts/base/ERC721Mock.sol/MockERC721.json"
import * as VerifierICArtifact from "../artifacts/contracts/verifier/verifierIc.sol/VerifierIC.json"
import * as VerifierVCArtifact from "../artifacts/contracts/verifier/verifierVc.sol/VerifierVC.json"

const { groth16 } = require("snarkjs");

import { Contract, ContractFactory, BigNumber } from "ethers";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

const buildPoseidon = require("circomlibjs").buildPoseidon;
const { poseidonContract } = require("circomlibjs");

import { MerkleTree } from "../test/utils/merkleTree";

import { PoseidonHasher } from "./utils/poseidonHasher";

import * as path from 'path'


describe("SPIC", function () {

  let admin: SignerWithAddress;
  let relayer: SignerWithAddress;
  let user: SignerWithAddress;
  let contributor: SignerWithAddress;

  let ERC20: Contract;
  let ERC721: Contract;
  let SPIC: Contract;
  let poseidonContractDeploy: Contract;

  let CIRCLE_ID = BigNumber.from(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("XORD-1")))

  let poseidonJs: any

  let tree: MerkleTree;

  let treeVc: MerkleTree;

  const getPoseidonFactory = (nInputs: number) => {
    const bytecode = poseidonContract.createCode(nInputs);
    const abiJson = poseidonContract.generateABI(nInputs);
    const abi = new ethers.utils.Interface(abiJson);
    return new ContractFactory(abi, bytecode);
  };

  it("SETUP", async () => {

    poseidonJs = await buildPoseidon();

    [admin, relayer, user, contributor] = await ethers.getSigners();
    ERC20 = await deployContract(admin, ERC20Artifact);
    ERC721 = await deployContract(admin, ERC721Artifact);

    let newERC721User = await ERC721.connect(user)
    await newERC721User.mint(1);

    let verifier1 = await deployContract(admin, VerifierICArtifact)
    let verifier2 = await deployContract(admin, VerifierVCArtifact)

    //NEED TO ADD THESE ADDRESSES IN THE SEMAPHORE VOTING
    poseidonContractDeploy = await getPoseidonFactory(2).connect(admin).deploy();

    CIRCLE_ID = poseidonJs.F.toObject(poseidonJs([CIRCLE_ID]))
    const IncrementalBinaryTreeLibFactory = await ethers.getContractFactory("IncrementalBinaryTree", {
      libraries: {
        PoseidonT3: poseidonContractDeploy.address
      },
      signer: admin
    })

    let ITree = await IncrementalBinaryTreeLibFactory.deploy()

    const SPICFactory = await ethers.getContractFactory("SPIC", {
      libraries: {
        IncrementalBinaryTree: ITree.address
      },
      signer: admin
    })
    SPIC = await SPICFactory.deploy(ERC20.address, ERC721.address, relayer.getAddress(), "50");

  });

  it("Create circle", async () => {
    let matchAmount = ethers.utils.parseUnits("100")

    let balanceBefore = await ERC20.balanceOf(admin.getAddress())

    await ERC20.approve(SPIC.address, matchAmount)

    await SPIC.createCircle(CIRCLE_ID, matchAmount, (Math.floor(Date.now() / 1000))+120)

    let balanceAfter = await ERC20.balanceOf(admin.getAddress())

    let totalCheck = balanceBefore - Number(matchAmount)

    expect(totalCheck.toString()).to.be.equal(balanceAfter);

    let circle = await SPIC.polls(CIRCLE_ID)

    expect(circle.matchAmount).not.equal("0");

  })

  it("Add contirbuter", async () => {
    await SPIC.addContributors(CIRCLE_ID, [contributor.getAddress()])

    let contirbuterStatus = await SPIC.contributors(CIRCLE_ID, contributor.address)

    expect(contirbuterStatus.status).to.be.equal(true)
  })

  it("Become Voter", async () => {
    tree = new MerkleTree(3, "Voter Identity", new PoseidonHasher(poseidonJs));

    treeVc = new MerkleTree(3, "Voter Commitment", new PoseidonHasher(poseidonJs))

    poseidonJs = await buildPoseidon();

    const IC = poseidonJs.F.toObject(poseidonJs([1, 11, 199]))

    await tree.insert(IC);

    let newERC721User = await ERC721.connect(user)

    await newERC721User.approve(SPIC.address, 1)

    let SPICNewUser = await SPIC.connect(user)

    await SPICNewUser.becomeVoter(CIRCLE_ID, IC, 1)

    let newOwner = await newERC721User.ownerOf(1)

    expect(newOwner).to.be.equal(SPIC.address)

    let rootSPIC = await SPIC.groups(CIRCLE_ID)

    expect(rootSPIC["root"]).to.be.equal(await tree.root())

  })

  it("Case Vote", async () => {

    const VN = poseidonJs.F.toObject([1, Number(CIRCLE_ID), contributor.address])

    await treeVc.insert(VN)

    let index = await SPIC.voterIndex();

    const { root, path_elements, path_index } = await tree.path(
      index-1
    );

    for(let i=0; i<path_elements.length; i++){
      path_elements[i] = BigNumber.from(path_elements[i]).toString()
    }
    
    var Input = {
      "identityNullifier": "1",
      "identityTrapdoor": "11",
      "secret": "199",
      "merklePath": path_elements,
      "pathIndices": path_index
    }


    var { proof, publicSignals } = await groth16.fullProve(Input, path.resolve('/media/shakeib98/zk-coordinape/circuits/identitycommitment/identity_commitment_js/identity_commitment.wasm'), path.resolve('/media/shakeib98/zk-coordinape/circuits/identitycommitment/circuit_final.zkey'));
    const solProof = {
      a: [proof.pi_a[0], proof.pi_a[1]],
      b: [
        [proof.pi_b[0][1], proof.pi_b[0][0]],
        [proof.pi_b[1][1], proof.pi_b[1][0]],
      ],
      c: [proof.pi_c[0], proof.pi_c[1]],
    };

    const proofForFunction = [solProof.a[0],solProof.a[1],solProof.b[0][0],solProof.b[0][1],solProof.b[1][0],solProof.b[1][1],solProof.c[0],solProof.c[1]]
    let spicRelayer = await SPIC.connect(relayer)
    await spicRelayer.castVoteExternal(contributor.address, root, VN, CIRCLE_ID, proofForFunction);
  
  })

  it("Withdraw NFT", async () => {

    const VN = poseidonJs.F.toObject([1, Number(CIRCLE_ID), contributor.address])

    let indexVotes = await SPIC.votesIndex()

    const { root, path_elements, path_index } = await treeVc.path(
      indexVotes-1
    );

    for(let i=0; i<path_elements.length; i++){
      path_elements[i] = BigNumber.from(path_elements[i]).toString()
    }


    var Input = {
      "identityNullifier": "1",
      "merklePath": path_elements,
      "pathIndices": path_index,
      "circle_id": CIRCLE_ID.toString(),
      "pk": contributor.address
    }


    var { proof, publicSignals } = await groth16.fullProve(Input, path.resolve('/media/shakeib98/zk-coordinape/circuits/votingnullifier/voting_nullifier_js/voting_nullifier.wasm'), path.resolve('/media/shakeib98/zk-coordinape/circuits/votingnullifier/circuit_final.zkey'));

    const solProof = {
      a: [proof.pi_a[0], proof.pi_a[1]],
      b: [
        [proof.pi_b[0][1], proof.pi_b[0][0]],
        [proof.pi_b[1][1], proof.pi_b[1][0]],
      ],
      c: [proof.pi_c[0], proof.pi_c[1]],
    };
    let SPICNewUser = await SPIC.connect(user)

    const proofForFunction = [solProof.a[0],solProof.a[1],solProof.b[0][0],solProof.b[0][1],solProof.b[1][0],solProof.b[1][1],solProof.c[0],solProof.c[1]]

    await ethers.provider.send("evm_increaseTime",[240])
    await ethers.provider.send("evm_mine", []);
    
    await SPICNewUser.withdrawNFT(1, VN, BigNumber.from( root).toString(), CIRCLE_ID, contributor.address,ERC721.address,proofForFunction);

    let balanceOfUser = await ERC20.balanceOf(user.address);

    expect(balanceOfUser).to.be.equal("5000000000000000000")

    let nftOwner = await ERC721.ownerOf(1);

    expect(nftOwner).to.be.equal(user.address)

  })

  it("Receive Compensation", async () => {
    let SPICNewUser = await SPIC.connect(contributor)

    await SPICNewUser.receiveCompensation(CIRCLE_ID);

    let balanceOfUser = await ERC20.balanceOf(contributor.address);

    expect(balanceOfUser).to.be.equal("95000000000000000000")

  })

});
