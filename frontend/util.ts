import type { BigNumberish } from "@ethersproject/bignumber";
import { formatUnits } from "@ethersproject/units";
import { ethers, BigNumber } from 'ethers';
import { Identity } from './classes/identity';
import path from 'path';
import getConfig from 'next/config';
const circomlibjs = require('circomlibjs');
const snarkjs = require('snarkjs');
// import snarkjs from "snarkjs"


// export const NFT_ADDRESS = "0x01F10f6D4D0E89690F2Bc807fEC341d765755aEC" //Rinkeby
// export const ERC20_ADDRESS = "0xBa066A3eD619E3C08788c2bd17CD634cE72f47aE" //Rinkeby
// export const SPIC_ADDRESS = "0x82F2Ce19e0C1818412644C430b5a592EA738aD58" //Rinkeby
export const NFT_ADDRESS = "0xFAC0D24db149b79cA0bd9781E1eBA7B30a7A8160" //Matic
export const ERC20_ADDRESS = "0x53A9a2E4b5BDd3567B3A689050b9beE7F6F1C974" //Matic
export const SPIC_ADDRESS = "0x07091125FF27b9f4fE312Ff4940cf3fEc36B38FB" //Matic

export const createIdentity = async (
  nullifier = (BigNumber.from(ethers.utils.randomBytes(8))).toString(),
  trapdoor = (BigNumber.from(ethers.utils.randomBytes(8))).toString(),
  secret = (BigNumber.from(ethers.utils.randomBytes(8))).toString()
  // nullifier = "433104768587788151",
  // trapdoor = "11154374049817327803",
  // secret = "10661417283784181689"
) => {
  // const poseidon = await circomlibjs.buildPoseidon();
  const identity = {nullifier,trapdoor,secret}
  console.log("identity before return ---",identity)
  return identity;
};

export const poseidonHash = (poseidon: any, inputs: BigNumberish[]) => {
  try {
    const hash = poseidon(inputs.map((x) => BigNumber.from(x).toBigInt()));
    // Make the number within the field size
    const hashStr = poseidon.F.toString(hash);
    // Make it a valid hex string
    const hashHex = BigNumber.from(hashStr).toHexString();
    // pad zero to make it 32 bytes, so that the output can be taken as a bytes32 contract argument
    const bytes32 = ethers.utils.hexZeroPad(hashHex, 32);
    return bytes32;
  } catch (err) {
    console.log('errrrr in poseidonHash ====>??', err);
  }
};

export function shortenHex(hex: string, length = 4) {
  return `${hex.substring(0, length + 2)}…${hex.substring(
    hex.length - length
  )}`;
}

const ETHERSCAN_PREFIXES = {
  1: "",
  3: "ropsten.",
  4: "rinkeby.",
  5: "goerli.",
  42: "kovan.",
};

export function formatEtherscanLink(
  type: "Account" | "Transaction",
  data: [number, string]
) {
  switch (type) {
    case "Account": {
      const [chainId, address] = data;
      return `https://explorer.ps.hmny.io/address/${address}`;
    }
    case "Transaction": {
      const [chainId, hash] = data;
      return `https://explorer.ps.hmny.io/tx/${hash}`;
    }
  }
}

export const parseBalance = (
  value: BigNumberish,
  decimals = 18,
  decimalsToDisplay = 3
) => parseFloat(formatUnits(value, decimals)).toFixed(decimalsToDisplay);
// import { walletContext } from "./context"

const truncateAddress = (str) => {
    str = `${str.slice(0,7)}...${str.slice(str.length-4,str.length)}`
    return str
}

const getStorageItem = async (key) => {
    try {
      let item = await localStorage.getItem(key);
      return item ? JSON.parse(item) : item;
    } catch (e) {
      console.log('Error in getting key -->', e);
      return null;
    }
  };
  
const setStorageItem = async (key, value) => {
    try {
      (BigInt.prototype as any).toJSON = function () {
        return this.toString();
      };
      let item = await localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      console.log('Error in setting key -->', e);
      return null;
    }
  };

  const serverPath = (staticFilePath: string) => {
    return path.join(
      getConfig().serverRuntimeConfig.PROJECT_ROOT,
      staticFilePath
    );
  };

  interface Proof {
  a: [BigNumberish, BigNumberish];
  b: [[BigNumberish, BigNumberish], [BigNumberish, BigNumberish]];
  c: [BigNumberish, BigNumberish];
}

  export const prove = async (input: any): Promise<Proof> => {
    let wasmPath = '/voting_nullifier.wasm';
    let zkeyPath = '/circuit_final.zkey';
    if (typeof window === 'undefined') {
      wasmPath = serverPath(`/public${wasmPath}`);
      zkeyPath = serverPath(`/public${zkeyPath}`);
    }
    const { proof, publicSignals } = await snarkjs.groth16.fullProve(
      input,
      wasmPath,
      zkeyPath
    );
    const solProof: Proof = {
      a: [proof.pi_a[0], proof.pi_a[1]],
      b: [
        [proof.pi_b[0][1], proof.pi_b[0][0]],
        [proof.pi_b[1][1], proof.pi_b[1][0]],
      ],
      c: [proof.pi_c[0], proof.pi_c[1]],
    };
    console.log("public signals", publicSignals)
    return solProof;
  };


export {
    truncateAddress,
    getStorageItem,
    setStorageItem
}