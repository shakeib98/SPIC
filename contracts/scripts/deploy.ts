import { Contract, ContractFactory } from "ethers";
import { ParamType } from "ethers/lib/utils";
import { ethers } from "hardhat";
const { poseidonContract } = require("circomlibjs");

// let ERC20 = "0x3Cb2265F6C9946D14995Eabe62C36bcD49dbD8A0"
// let ERC721 = "0x43615Caca188f80d0585F9c3Ace6E11B0B2489d5"
// let SPIC = "0x9f214bc5E8f7D67dA81e07B3793B4c46aB8F64c9"

//HAMRONY
// let ERC20 = "0x2412a440caE9bA860a589e2a9E26568f1C986AF0"
// let ERC721 = "0xC36Bf6981D5f0D70B29353F6BEB6d208e3A6218F"
// let SPIC = "0x2D4796b605164197B1977340f6476C786B40cdb6"


// let VC = "0x05554873Fd557771202730E4Ad185621EE336BF5"
// let IC = "0x7255e1A0Adc869f4bcCA9b396623d6d2DF64b5a1"

// 0x2f60994080ca98A324220199B3eC42726B6e763F 0x242B792154b132C4FB662a50eEde8820e453Bf3c


//RINKEBYYY
let ERC20 = "0xBa066A3eD619E3C08788c2bd17CD634cE72f47aE"
let ERC721 = "0x01F10f6D4D0E89690F2Bc807fEC341d765755aEC"
let POSEIDON = "0x791B35e919f0e55436dd195DAF2202AE3395327e"
let MT = "0x32D0467034A390a6Accdb3c2a4f27D27778eC64b"
let SPIC = "0xa07fA3dC2b41000080D3703Ee91F531840228E86"
let PAIRING = ""

let VIC = "0xd1a608c27814c822fB8Fb1e72906a5d8ac16BD92"
let VVN = "0x0E77bD90D0791e21147f0802C37C1C5DA3DEdF11"

async function main() {

  //ERC20
  // await deployERC20()

  //ERC721
  // let c = await deployERC721();

  //Mint
  // await mintNFT(c)

  //Verifiers
  // await deployVerifiers()

  //SPIC
  await deploySPIC()
}



async function deployERC20() {
  const ERC20 = await ethers.getContractFactory("MockERC20");
  const contract = await ERC20.deploy();

  await contract.deployed();

  // await ERC20.generateERC20("10000000000000000000000")

  console.log("ERC20 deployed to:", contract.address);
}

async function deployERC721() {
  const ERC20 = await ethers.getContractFactory("MockERC721");
  const contract = await ERC20.deploy();

  await contract.deployed();

  console.log("NFT deployed to:", contract.address);

  return contract;

}

// async function deployVerifiers() {


//   console.log(contract1.address, contract2.address);

// }

async function mintNFT(contract: Contract) {
  await contract.mint(1);
  await contract.mint(2);
  await contract.mint(3);
  await contract.mint(4);
  await contract.mint(5);
  await contract.mint(6);
  await contract.mint(7);
  await contract.mint(8);
  await contract.mint(9);
  await contract.mint(10);
  await contract.mint(11);
  await contract.mint(12);
  await contract.mint(13);
  await contract.mint(14);
  await contract.mint(15);
  await contract.mint(16);

  await contract.mint(17);
  await contract.mint(18);
  await contract.mint(19);
  await contract.mint(20);
  await contract.mint(21);
  await contract.mint(22);
  await contract.mint(23);
  await contract.mint(24);
  await contract.mint(25);
  await contract.mint(26);
  await contract.mint(27);
  await contract.mint(28);
  await contract.mint(29);
  await contract.mint(30);
}

async function deploySPIC() {
  // const PairingContract = await ethers.getContractFactory("Pairing");
  // const contractP = await PairingContract.deploy();
  // await contractP.deployed();

  // console.log(contractP.address)


  const VC = await ethers.getContractFactory("VerifierVC");


  const IC = await ethers.getContractFactory("VerifierIC");

  const contract2 = await VC.deploy();
  const contract1 = await IC.deploy();

  await contract1.deployed();
  await contract2.deployed();

  const PoseidonLibFactory = await (await getPoseidonFactory(2)).deploy()

  await PoseidonLibFactory.deployed()

  const IncrementalBinaryTreeLibFactory = await ethers.getContractFactory("IncrementalBinaryTree", {
    libraries: {
      PoseidonT3: PoseidonLibFactory.address
    }
  })
  const incrementalBinaryTreeLib = await IncrementalBinaryTreeLibFactory.deploy()

  await incrementalBinaryTreeLib.deployed()

  console.log(PoseidonLibFactory.address, incrementalBinaryTreeLib.address)

  const ContractFactory = await ethers.getContractFactory("SPIC", {
    libraries: {
      IncrementalBinaryTree: incrementalBinaryTreeLib.address
    }
  })

  const contract = await ContractFactory.deploy(ERC20, ERC721, "0xC820F9d9b6F2F1226Eeb63d9A67bD285Be4829B8", 50, contract1.address, contract2.address);

  await contract.deployed()

  console.log("SPIC deployed to:", contract.address);

  // return contract

}

const getPoseidonFactory = async (nInputs: number) => {
  const bytecode = poseidonContract.createCode(nInputs);
  const abiJson = poseidonContract.generateABI(nInputs);
  const abi = new ethers.utils.Interface(abiJson);
  const [signer] = await ethers.getSigners();
  return new ethers.ContractFactory(abi, bytecode, signer);
};




// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});




