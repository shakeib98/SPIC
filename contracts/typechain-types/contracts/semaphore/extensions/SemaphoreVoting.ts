/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../../../common";

export interface SemaphoreVotingInterface extends utils.Interface {
  functions: {
    "VERIFIER_IDENTITY()": FunctionFragment;
    "VERIFIER_VOTE()": FunctionFragment;
    "getDepth(uint256)": FunctionFragment;
    "getNumberOfLeaves(uint256)": FunctionFragment;
    "getRoot(uint256)": FunctionFragment;
    "groups(uint256)": FunctionFragment;
    "polls(uint256)": FunctionFragment;
    "votersGroup(uint256)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "VERIFIER_IDENTITY"
      | "VERIFIER_VOTE"
      | "getDepth"
      | "getNumberOfLeaves"
      | "getRoot"
      | "groups"
      | "polls"
      | "votersGroup"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "VERIFIER_IDENTITY",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "VERIFIER_VOTE",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getDepth",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getNumberOfLeaves",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getRoot",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "groups",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "polls",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "votersGroup",
    values: [PromiseOrValue<BigNumberish>]
  ): string;

  decodeFunctionResult(
    functionFragment: "VERIFIER_IDENTITY",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "VERIFIER_VOTE",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getDepth", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getNumberOfLeaves",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getRoot", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "groups", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "polls", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "votersGroup",
    data: BytesLike
  ): Result;

  events: {};
}

export interface SemaphoreVoting extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: SemaphoreVotingInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    VERIFIER_IDENTITY(overrides?: CallOverrides): Promise<[string]>;

    VERIFIER_VOTE(overrides?: CallOverrides): Promise<[string]>;

    getDepth(
      groupId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[number]>;

    getNumberOfLeaves(
      groupId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getRoot(
      groupId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber, BigNumber]>;

    groups(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [number, BigNumber, BigNumber] & {
        depth: number;
        root: BigNumber;
        numberOfLeaves: BigNumber;
      }
    >;

    polls(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber, string, number] & {
        matchAmount: BigNumber;
        startEpoch: BigNumber;
        endEpoch: BigNumber;
        coordinator: string;
        activeContributorsCount: number;
      }
    >;

    votersGroup(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [number, BigNumber, BigNumber] & {
        depth: number;
        root: BigNumber;
        numberOfLeaves: BigNumber;
      }
    >;
  };

  VERIFIER_IDENTITY(overrides?: CallOverrides): Promise<string>;

  VERIFIER_VOTE(overrides?: CallOverrides): Promise<string>;

  getDepth(
    groupId: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<number>;

  getNumberOfLeaves(
    groupId: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getRoot(
    groupId: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<[BigNumber, BigNumber]>;

  groups(
    arg0: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<
    [number, BigNumber, BigNumber] & {
      depth: number;
      root: BigNumber;
      numberOfLeaves: BigNumber;
    }
  >;

  polls(
    arg0: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, BigNumber, BigNumber, string, number] & {
      matchAmount: BigNumber;
      startEpoch: BigNumber;
      endEpoch: BigNumber;
      coordinator: string;
      activeContributorsCount: number;
    }
  >;

  votersGroup(
    arg0: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<
    [number, BigNumber, BigNumber] & {
      depth: number;
      root: BigNumber;
      numberOfLeaves: BigNumber;
    }
  >;

  callStatic: {
    VERIFIER_IDENTITY(overrides?: CallOverrides): Promise<string>;

    VERIFIER_VOTE(overrides?: CallOverrides): Promise<string>;

    getDepth(
      groupId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<number>;

    getNumberOfLeaves(
      groupId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getRoot(
      groupId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber, BigNumber]>;

    groups(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [number, BigNumber, BigNumber] & {
        depth: number;
        root: BigNumber;
        numberOfLeaves: BigNumber;
      }
    >;

    polls(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber, string, number] & {
        matchAmount: BigNumber;
        startEpoch: BigNumber;
        endEpoch: BigNumber;
        coordinator: string;
        activeContributorsCount: number;
      }
    >;

    votersGroup(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [number, BigNumber, BigNumber] & {
        depth: number;
        root: BigNumber;
        numberOfLeaves: BigNumber;
      }
    >;
  };

  filters: {};

  estimateGas: {
    VERIFIER_IDENTITY(overrides?: CallOverrides): Promise<BigNumber>;

    VERIFIER_VOTE(overrides?: CallOverrides): Promise<BigNumber>;

    getDepth(
      groupId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getNumberOfLeaves(
      groupId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getRoot(
      groupId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    groups(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    polls(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    votersGroup(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    VERIFIER_IDENTITY(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    VERIFIER_VOTE(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getDepth(
      groupId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getNumberOfLeaves(
      groupId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getRoot(
      groupId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    groups(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    polls(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    votersGroup(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
