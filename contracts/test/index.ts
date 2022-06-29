import { expect, use } from "chai";
import { ethers } from "hardhat";
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

  let random = Math.floor(Math.random() * 1000)

  // let CIRCLE_ID = (BigNumber.from(ethers.utils.toUtf8Bytes(`XORD-` + (Math.floor(Math.random()*1000))))).toString()

  // let IDENTITY_NULLIFIER = (BigNumber.from(ethers.utils.randomBytes(8))).toString()

  // let TRAPDOOR = (BigNumber.from(ethers.utils.randomBytes(8))).toString()

  // let SECRET = (BigNumber.from(ethers.utils.randomBytes(8))).toString()

  let CIRCLE_ID = "507256308655616800666673"

  let TRAPDOOR = "11154374049817327803"

  let SECRET = "10661417283784181689"

  let IDENTITY_NULLIFIER = "433104768587788151"

  console.log(CIRCLE_ID, IDENTITY_NULLIFIER, TRAPDOOR, SECRET)


  // let IDENTITY_NULLIFIER = (BigNumber.from([115, 230, 167, 11, 191, 140, 115, 128, 216, 66, 252, 150, 196, 160, 226])).toString()

  // let TRAPDOOR = (BigNumber.from([237, 198, 219, 144, 220, 244, 104, 239, 180, 54, 45, 244, 43, 129, 104])).toString();

  // let SECRET = (BigNumber.from(([85, 89, 252, 220, 56, 68, 134, 43, 242, 150, 122, 195, 18, 225, 130]))).toString()

  // let CIRCLE_ID = "1629029184324433490482"
  // let IDENTITY_NULLIFIER = "14093479557083725436"
  // let TRAPDOOR = "15121684268382107221"
  // let SECRET = "7168293784926328097"

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

    // 0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0 0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9

    //NEED TO ADD THESE ADDRESSES IN THE SEMAPHORE VOTING
    poseidonContractDeploy = await getPoseidonFactory(2).connect(admin).deploy();

    // CIRCLE_ID = poseidonJs.F.toObject(poseidonJs([CIRCLE_ID]))
    // IDENTITY_NULLIFIER = poseidonJs.F.toObject(poseidonJs([IDENTITY_NULLIFIER]))
    // TRAPDOOR = poseidonJs.F.toObject(poseidonJs([TRAPDOOR]))
    // SECRET = poseidonJs.F.toObject(poseidonJs([SECRET]))

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
    SPIC = await SPICFactory.deploy(ERC20.address, ERC721.address, relayer.getAddress(), "50", verifier1.address, verifier2.address);

  });

  it("Create circle", async () => {
    let matchAmount = ethers.utils.parseUnits("100")

    let balanceBefore = await ERC20.balanceOf(admin.getAddress())

    await ERC20.approve(SPIC.address, matchAmount)


    await SPIC.createCircle(CIRCLE_ID.toString(), matchAmount, (Math.floor(Date.now() / 1000)) + 120)

    let balanceAfter = await ERC20.balanceOf(admin.getAddress())

    // let totalCheck = balanceBefore - Number(matchAmount)

    // expect(totalCheck.toString()).to.be.equal(balanceAfter);

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

    // poseidonJs = await buildPoseidon();

    const IC = poseidonJs.F.toObject(poseidonJs([IDENTITY_NULLIFIER, TRAPDOOR, SECRET]))

    console.log(IC, "ICCCCCCC")

    await tree.insert(IC);


    let newERC721User = await ERC721.connect(user)

    await newERC721User.approve(SPIC.address, 1)

    let SPICNewUser = await SPIC.connect(user)

    await SPICNewUser.becomeVoter(CIRCLE_ID, IC, 1)

    // await SPICNewUser.becomeVoter(CIRCLE_ID, IC, 1)

    let newOwner = await newERC721User.ownerOf(1)

    expect(newOwner).to.be.equal(SPIC.address)

    let rootSPIC = await SPIC.groups(CIRCLE_ID)

    // expect(rootSPIC["root"]).to.be.equal(await tree.root())

  })

  it("Case Vote", async () => {
    // poseidonJs = await buildPoseidon();

    const VN = poseidonJs.F.toObject(poseidonJs([IDENTITY_NULLIFIER, CIRCLE_ID, "0xc081996e8ffd1da3f4784c4b8b6ef8e07333163e"]))

    console.log(VN)

    await treeVc.insert(VN)

    let index = await SPIC.voterIndex();

    const { root, path_elements, path_index } = await tree.path(
      index - 1
    );

    for (let i = 0; i < path_elements.length; i++) {
      path_elements[i] = BigNumber.from((path_elements[i])).toString()
    }

    let rootContract = await SPIC.groups(CIRCLE_ID)

    console.log(rootContract.root, BigNumber.from(root), BigNumber.from("0x0396b351b6eea14addb2480dd15cb0263e791a3f0f1b0224a404fb4dc90a8478"))

    var Input = {
      "identityNullifier": IDENTITY_NULLIFIER,
      "identityTrapdoor": TRAPDOOR,
      "secret": SECRET,
      "mRoot": BigNumber.from(root).toString(),
      "merklePath": path_elements,
      "pathIndices": path_index
    }



    const proofPP = ["18402357653652221791292602116153455282065007804347581394879905987406461624966", "7981194395657942507018109309389487596006682235696906249931936823757902667002",
     "10384414987463649196041693860862265030254746072173980050777354248097281812620", "1788462144759378535786484195191603259318515487261050768370529917542356744539",
      "21456828754342498757976146138045907917609610233548277422710350919214662880009", "15405701760679553710804864606658017299966880507316603964030878277012420336016",
       "7043784725328250352687839688675620579243639683696439672228309145479855255639", "19220198600703895469744125381449763566480150849914572897836867104138464150749"]






    // ["15580039285181527008834350465509471318503004194890778210919485289353094032012"]


    var { proof, publicSignals } = await groth16.fullProve(Input, path.resolve('/media/shakeib98/SPIC/circuits/identitycommitment/identity_commitment_js/identity_commitment.wasm'), path.resolve('/media/shakeib98/SPIC/circuits/identitycommitment/circuit_final.zkey'));

    const solProof = {
      a: [proof.pi_a[0], proof.pi_a[1]],
      b: [
        [proof.pi_b[0][1], proof.pi_b[0][0]],
        [proof.pi_b[1][1], proof.pi_b[1][0]],
      ],
      c: [proof.pi_c[0], proof.pi_c[1]],
    };

    console.log(solProof)

    const proofForFunction = [solProof.a[0], solProof.a[1], solProof.b[0][0], solProof.b[0][1], solProof.b[1][0], solProof.b[1][1], solProof.c[0], solProof.c[1]]
    let spicRelayer = await SPIC.connect(relayer)
    await spicRelayer.castVoteExternal(contributor.address, BigNumber.from(root), VN, CIRCLE_ID, proofPP);

  })



  // it("Withdraw NFT", async () => {
  //   poseidonJs = await buildPoseidon();
  //   const VN = poseidonJs.F.toObject(poseidonJs([IDENTITY_NULLIFIER, CIRCLE_ID, contributor.address]))

  //   let indexVotes = await SPIC.votesIndex()

  //   const { root, path_elements, path_index } = await treeVc.path(
  //     indexVotes - 1
  //   );

  //   // let rootContract = await SPIC.votersGroup(CIRCLE_ID)

  //   // console.log(rootContract.root , BigNumber.from(root))

  //   for (let i = 0; i < path_elements.length; i++) {
  //     path_elements[i] = BigNumber.from(path_elements[i]).toString()
  //   }


  //   var Input = {
  //     "identityNullifier": IDENTITY_NULLIFIER,
  //     "merklePath": path_elements,
  //     "pathIndices": path_index,
  //     "circle_id": CIRCLE_ID,
  //     "pk": contributor.address,
  //     "mRoot": BigNumber.from(root).toString()
  //   }


  //   var { proof, publicSignals } = await groth16.fullProve(Input, path.resolve('/media/shakeib98/SPIC/circuits/votingnullifier/voting_nullifier_js/voting_nullifier.wasm'), path.resolve('/media/shakeib98/SPIC/circuits/votingnullifier/circuit_final.zkey'));
  //   // console.log(publicSignals, "VCCCCCCCCCCCCCC")
  //   const solProof = {
  //     a: [proof.pi_a[0], proof.pi_a[1]],
  //     b: [
  //       [proof.pi_b[0][1], proof.pi_b[0][0]],
  //       [proof.pi_b[1][1], proof.pi_b[1][0]],
  //     ],
  //     c: [proof.pi_c[0], proof.pi_c[1]],
  //   };
  //   let SPICNewUser = await SPIC.connect(user)

  //   const proofForFunction = [solProof.a[0], solProof.a[1], solProof.b[0][0], solProof.b[0][1], solProof.b[1][0], solProof.b[1][1], solProof.c[0], solProof.c[1]]

  //   await ethers.provider.send("evm_increaseTime", [240])
  //   await ethers.provider.send("evm_mine", []);

  //   await SPICNewUser.withdrawNFT(1, VN, BigNumber.from(root), CIRCLE_ID, contributor.address, ERC721.address, proofForFunction);
  //   let balanceOfUser = await ERC20.balanceOf(user.address);

  //   expect(balanceOfUser).to.be.equal("5000000000000000000")

  //   let nftOwner = await ERC721.ownerOf(1);

  //   expect(nftOwner).to.be.equal(user.address)

  // })

  // it("Receive Compensation", async () => {
  //   let SPICNewUser = await SPIC.connect(contributor)

  //   await SPICNewUser.receiveCompensation(CIRCLE_ID);

  //   let balanceOfUser = await ERC20.balanceOf(contributor.address);

  //   expect(balanceOfUser).to.be.equal("95000000000000000000")

  // })

});
