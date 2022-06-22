/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  IVerifierIC,
  IVerifierICInterface,
} from "../../../../contracts/semaphore/interfaces/IVerifierIC";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256[2]",
        name: "a",
        type: "uint256[2]",
      },
      {
        internalType: "uint256[2][2]",
        name: "b",
        type: "uint256[2][2]",
      },
      {
        internalType: "uint256[2]",
        name: "c",
        type: "uint256[2]",
      },
      {
        internalType: "uint256[1]",
        name: "input",
        type: "uint256[1]",
      },
    ],
    name: "verifyProof",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export class IVerifierIC__factory {
  static readonly abi = _abi;
  static createInterface(): IVerifierICInterface {
    return new utils.Interface(_abi) as IVerifierICInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IVerifierIC {
    return new Contract(address, _abi, signerOrProvider) as IVerifierIC;
  }
}
