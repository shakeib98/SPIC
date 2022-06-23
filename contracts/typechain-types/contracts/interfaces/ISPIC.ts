/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
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
} from "../../common";

export interface ISPICInterface extends utils.Interface {
  functions: {
    "addContributors(uint256,address[])": FunctionFragment;
    "becomeVoter(uint256,uint256,uint256)": FunctionFragment;
    "castVoteExternal(address,uint256,uint256,uint256,uint256[8])": FunctionFragment;
    "createCircle(uint256,uint256,uint256)": FunctionFragment;
    "receiveCompensation(uint256)": FunctionFragment;
    "withdrawNFT(uint256,uint256,uint256,uint256,address,address,uint256[8])": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "addContributors"
      | "becomeVoter"
      | "castVoteExternal"
      | "createCircle"
      | "receiveCompensation"
      | "withdrawNFT"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "addContributors",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<string>[]]
  ): string;
  encodeFunctionData(
    functionFragment: "becomeVoter",
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "castVoteExternal",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>[]
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "createCircle",
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "receiveCompensation",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "withdrawNFT",
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>[]
    ]
  ): string;

  decodeFunctionResult(
    functionFragment: "addContributors",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "becomeVoter",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "castVoteExternal",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "createCircle",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "receiveCompensation",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "withdrawNFT",
    data: BytesLike
  ): Result;

  events: {};
}

export interface ISPIC extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: ISPICInterface;

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
    addContributors(
      _id: PromiseOrValue<BigNumberish>,
      _addresses: PromiseOrValue<string>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    becomeVoter(
      _id: PromiseOrValue<BigNumberish>,
      identityCommitment: PromiseOrValue<BigNumberish>,
      _tokenId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    castVoteExternal(
      pk: PromiseOrValue<string>,
      mRootIc: PromiseOrValue<BigNumberish>,
      votingCommitment: PromiseOrValue<BigNumberish>,
      _pollId: PromiseOrValue<BigNumberish>,
      proofIc: PromiseOrValue<BigNumberish>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    createCircle(
      _id: PromiseOrValue<BigNumberish>,
      _matchAmount: PromiseOrValue<BigNumberish>,
      _endEpoch: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    receiveCompensation(
      pollId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    withdrawNFT(
      nftId: PromiseOrValue<BigNumberish>,
      votingCommitment: PromiseOrValue<BigNumberish>,
      mRootVc: PromiseOrValue<BigNumberish>,
      pollId: PromiseOrValue<BigNumberish>,
      pkContributor: PromiseOrValue<string>,
      nftAddress: PromiseOrValue<string>,
      proofVc: PromiseOrValue<BigNumberish>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  addContributors(
    _id: PromiseOrValue<BigNumberish>,
    _addresses: PromiseOrValue<string>[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  becomeVoter(
    _id: PromiseOrValue<BigNumberish>,
    identityCommitment: PromiseOrValue<BigNumberish>,
    _tokenId: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  castVoteExternal(
    pk: PromiseOrValue<string>,
    mRootIc: PromiseOrValue<BigNumberish>,
    votingCommitment: PromiseOrValue<BigNumberish>,
    _pollId: PromiseOrValue<BigNumberish>,
    proofIc: PromiseOrValue<BigNumberish>[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  createCircle(
    _id: PromiseOrValue<BigNumberish>,
    _matchAmount: PromiseOrValue<BigNumberish>,
    _endEpoch: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  receiveCompensation(
    pollId: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  withdrawNFT(
    nftId: PromiseOrValue<BigNumberish>,
    votingCommitment: PromiseOrValue<BigNumberish>,
    mRootVc: PromiseOrValue<BigNumberish>,
    pollId: PromiseOrValue<BigNumberish>,
    pkContributor: PromiseOrValue<string>,
    nftAddress: PromiseOrValue<string>,
    proofVc: PromiseOrValue<BigNumberish>[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    addContributors(
      _id: PromiseOrValue<BigNumberish>,
      _addresses: PromiseOrValue<string>[],
      overrides?: CallOverrides
    ): Promise<void>;

    becomeVoter(
      _id: PromiseOrValue<BigNumberish>,
      identityCommitment: PromiseOrValue<BigNumberish>,
      _tokenId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    castVoteExternal(
      pk: PromiseOrValue<string>,
      mRootIc: PromiseOrValue<BigNumberish>,
      votingCommitment: PromiseOrValue<BigNumberish>,
      _pollId: PromiseOrValue<BigNumberish>,
      proofIc: PromiseOrValue<BigNumberish>[],
      overrides?: CallOverrides
    ): Promise<void>;

    createCircle(
      _id: PromiseOrValue<BigNumberish>,
      _matchAmount: PromiseOrValue<BigNumberish>,
      _endEpoch: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    receiveCompensation(
      pollId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    withdrawNFT(
      nftId: PromiseOrValue<BigNumberish>,
      votingCommitment: PromiseOrValue<BigNumberish>,
      mRootVc: PromiseOrValue<BigNumberish>,
      pollId: PromiseOrValue<BigNumberish>,
      pkContributor: PromiseOrValue<string>,
      nftAddress: PromiseOrValue<string>,
      proofVc: PromiseOrValue<BigNumberish>[],
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {};

  estimateGas: {
    addContributors(
      _id: PromiseOrValue<BigNumberish>,
      _addresses: PromiseOrValue<string>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    becomeVoter(
      _id: PromiseOrValue<BigNumberish>,
      identityCommitment: PromiseOrValue<BigNumberish>,
      _tokenId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    castVoteExternal(
      pk: PromiseOrValue<string>,
      mRootIc: PromiseOrValue<BigNumberish>,
      votingCommitment: PromiseOrValue<BigNumberish>,
      _pollId: PromiseOrValue<BigNumberish>,
      proofIc: PromiseOrValue<BigNumberish>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    createCircle(
      _id: PromiseOrValue<BigNumberish>,
      _matchAmount: PromiseOrValue<BigNumberish>,
      _endEpoch: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    receiveCompensation(
      pollId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    withdrawNFT(
      nftId: PromiseOrValue<BigNumberish>,
      votingCommitment: PromiseOrValue<BigNumberish>,
      mRootVc: PromiseOrValue<BigNumberish>,
      pollId: PromiseOrValue<BigNumberish>,
      pkContributor: PromiseOrValue<string>,
      nftAddress: PromiseOrValue<string>,
      proofVc: PromiseOrValue<BigNumberish>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    addContributors(
      _id: PromiseOrValue<BigNumberish>,
      _addresses: PromiseOrValue<string>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    becomeVoter(
      _id: PromiseOrValue<BigNumberish>,
      identityCommitment: PromiseOrValue<BigNumberish>,
      _tokenId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    castVoteExternal(
      pk: PromiseOrValue<string>,
      mRootIc: PromiseOrValue<BigNumberish>,
      votingCommitment: PromiseOrValue<BigNumberish>,
      _pollId: PromiseOrValue<BigNumberish>,
      proofIc: PromiseOrValue<BigNumberish>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    createCircle(
      _id: PromiseOrValue<BigNumberish>,
      _matchAmount: PromiseOrValue<BigNumberish>,
      _endEpoch: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    receiveCompensation(
      pollId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    withdrawNFT(
      nftId: PromiseOrValue<BigNumberish>,
      votingCommitment: PromiseOrValue<BigNumberish>,
      mRootVc: PromiseOrValue<BigNumberish>,
      pollId: PromiseOrValue<BigNumberish>,
      pkContributor: PromiseOrValue<string>,
      nftAddress: PromiseOrValue<string>,
      proofVc: PromiseOrValue<BigNumberish>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}