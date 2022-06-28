import { Contract, ContractFactory } from "ethers";
import { ethers } from "hardhat";
const { poseidonContract } = require("circomlibjs");

// let ERC20 = "0x3Cb2265F6C9946D14995Eabe62C36bcD49dbD8A0"
// let ERC721 = "0x43615Caca188f80d0585F9c3Ace6E11B0B2489d5"
// let SPIC = "0x9f214bc5E8f7D67dA81e07B3793B4c46aB8F64c9"

let ERC20 = "0x2412a440caE9bA860a589e2a9E26568f1C986AF0"
let ERC721 = "0xC36Bf6981D5f0D70B29353F6BEB6d208e3A6218F"
let SPIC = "0xc60D7d4A08cC2eA904941746A4CfB7BE3747C095"


// let VC = "0x05554873Fd557771202730E4Ad185621EE336BF5"
// let IC = "0x7255e1A0Adc869f4bcCA9b396623d6d2DF64b5a1"

// 0x2f60994080ca98A324220199B3eC42726B6e763F 0x242B792154b132C4FB662a50eEde8820e453Bf3c


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

async function deployERC721()  {
  const ERC20 = await ethers.getContractFactory("MockERC721");
  const contract = await ERC20.deploy();

  await contract.deployed();

  console.log("NFT deployed to:", contract.address);

  return contract;

}

async function deployVerifiers() {
  const VC = await ethers.getContractFactory("VerifierVC");
  const IC = await ethers.getContractFactory("VerifierIC");
  const contract1 = await VC.deploy();
  const contract2 = await IC.deploy();

  await contract1.deployed();
  await contract2.deployed();

  console.log(contract1.address, contract2.address);

}

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
  

  const PoseidonLibFactory = await (await getPoseidonFactory(2)).deploy()

  await PoseidonLibFactory.deployed()

  const IncrementalBinaryTreeLibFactory = await ethers.getContractFactory("IncrementalBinaryTree", {
    libraries: {
      PoseidonT3: PoseidonLibFactory.address
    }
  })
  const incrementalBinaryTreeLib = await IncrementalBinaryTreeLibFactory.deploy()

  await incrementalBinaryTreeLib.deployed()

  const ContractFactory = await ethers.getContractFactory("SPIC", {
    libraries: {
      IncrementalBinaryTree: incrementalBinaryTreeLib.address
    }
  })

  const contract = await ContractFactory.deploy(ERC20, ERC721, "0xC820F9d9b6F2F1226Eeb63d9A67bD285Be4829B8", 50)

  await contract.deployed()

  console.log("SPIC deployed to:", contract.address);

  // return contract

}

const getPoseidonFactory = async (nInputs: number) => {
  const bytecode = poseidonContract.createCode(nInputs);
  const abiJson = poseidonContract.generateABI(nInputs);
  const abi = new ethers.utils.Interface(abiJson);
  const [signer] = await ethers.getSigners();
  return new ethers.ContractFactory(abi, bytecode,signer);
};


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});




