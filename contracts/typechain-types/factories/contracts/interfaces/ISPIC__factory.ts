/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  ISPIC,
  ISPICInterface,
} from "../../../contracts/interfaces/ISPIC";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_id",
        type: "uint256",
      },
      {
        internalType: "address[]",
        name: "_addresses",
        type: "address[]",
      },
    ],
    name: "addContributors",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_id",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "identityCommitment",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
    ],
    name: "becomeVoter",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "pk",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "mRootIc",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "votingCommitment",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_pollId",
        type: "uint256",
      },
      {
        internalType: "uint256[8]",
        name: "proofIc",
        type: "uint256[8]",
      },
    ],
    name: "castVoteExternal",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_id",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_matchAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_endEpoch",
        type: "uint256",
      },
    ],
    name: "createCircle",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "pollId",
        type: "uint256",
      },
    ],
    name: "receiveCompensation",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "nftId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "votingCommitment",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "mRootVc",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "pollId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "pkContributor",
        type: "address",
      },
      {
        internalType: "address",
        name: "nftAddress",
        type: "address",
      },
      {
        internalType: "uint256[8]",
        name: "proofVc",
        type: "uint256[8]",
      },
    ],
    name: "withdrawNFT",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export class ISPIC__factory {
  static readonly abi = _abi;
  static createInterface(): ISPICInterface {
    return new utils.Interface(_abi) as ISPICInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): ISPIC {
    return new Contract(address, _abi, signerOrProvider) as ISPIC;
  }
}