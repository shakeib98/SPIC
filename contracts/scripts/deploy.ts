import { Contract, ContractFactory } from "ethers";
import { ethers } from "hardhat";
const { poseidonContract } = require("circomlibjs");

let ERC20 = "0x05554873Fd557771202730E4Ad185621EE336BF5"
let ERC721 = "0x39A72ED2E39032E000864151Ebaf1E466125a5a3"
let SPIC = "0xE2d7Be5F3b639AaA883EB450cCF4C376013618fd"


let VC = "0xeE2D932bb05E10a710944E94d8AA58c2873ab173"
let IC = "0xC71e5bB4515e9520c9dAD91423738394f104EeCd"


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
s
  const ContractFactory = await ethers.getContractFactory("SPIC", {
    libraries: {
      IncrementalBinaryTree: incrementalBinaryTreeLib.address
    }
  })

  console.log(ContractFactory.signer)

  const contract = await ContractFactory.deploy(ERC20, ERC721, "0x2B2a7bd0b57298005EFeb8ddAE0D6f7037066E45", "0xC820F9d9b6F2F1226Eeb63d9A67bD285Be4829B8", 50)

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



