/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { SPIC, SPICInterface } from "../SPIC";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_relayer",
        type: "address",
      },
      {
        internalType: "address",
        name: "_verifierIC",
        type: "address",
      },
      {
        internalType: "address",
        name: "_verifierVC",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "_id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_matchAmount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_startEpoch",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_endEpoch",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "voterIncentive",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "erc20Address",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "erc721Addres",
        type: "address",
      },
    ],
    name: "CircleCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "_contributor",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "CompensationReceived",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "_contributor",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_id",
        type: "uint256",
      },
    ],
    name: "ContributorAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "nftId",
        type: "uint256",
      },
    ],
    name: "NFTWithdrawn",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "pollId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "votingCommitment",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "pkContributor",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint8",
        name: "index",
        type: "uint8",
      },
    ],
    name: "VoteCasted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "identityCommitment",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint8",
        name: "index",
        type: "uint8",
      },
    ],
    name: "VoterAdded",
    type: "event",
  },
  {
    inputs: [],
    name: "RELAYER",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "VERIFIER_IDENTITY",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "VERIFIER_VOTE",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
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
        name: "",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "contributors",
    outputs: [
      {
        internalType: "uint8",
        name: "voteCount",
        type: "uint8",
      },
      {
        internalType: "bool",
        name: "status",
        type: "bool",
      },
    ],
    stateMutability: "view",
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
        name: "voterIncentive",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "erc20Address",
        type: "address",
      },
      {
        internalType: "address",
        name: "erc721Address",
        type: "address",
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
        name: "groupId",
        type: "uint256",
      },
    ],
    name: "getDepth",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "groupId",
        type: "uint256",
      },
    ],
    name: "getNumberOfLeaves",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "groupId",
        type: "uint256",
      },
    ],
    name: "getRoot",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "groups",
    outputs: [
      {
        internalType: "uint8",
        name: "depth",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "root",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "numberOfLeaves",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "nftToAddress",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "polls",
    outputs: [
      {
        internalType: "uint256",
        name: "matchAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "startEpoch",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "endEpoch",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "voterIncentive",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "coordinator",
        type: "address",
      },
      {
        internalType: "address",
        name: "erc20Address",
        type: "address",
      },
      {
        internalType: "address",
        name: "erc721Address",
        type: "address",
      },
      {
        internalType: "uint8",
        name: "votesIndex",
        type: "uint8",
      },
      {
        internalType: "uint8",
        name: "voterIndex",
        type: "uint8",
      },
    ],
    stateMutability: "view",
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
        name: "",
        type: "uint256",
      },
    ],
    name: "votersGroup",
    outputs: [
      {
        internalType: "uint8",
        name: "depth",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "root",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "numberOfLeaves",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
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

export class SPIC__factory {
  static readonly abi = _abi;
  static createInterface(): SPICInterface {
    return new utils.Interface(_abi) as SPICInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): SPIC {
    return new Contract(address, _abi, signerOrProvider) as SPIC;
  }
}