import { BigNumber, Contract } from "ethers";
import Services from "../classes/fetch";
import { createIdentity, setStorageItem } from "../util";
const buildPoseidon = require("circomlibjs").buildPoseidon;
import ERC721_ABI from "../contracts/ERC721.json";
import { useWeb3React } from "@web3-react/core";

export const becomeVoter = async ({
  spic,
  library,
  account,
  CIRCLE_ID,
  IC,
  NFT_ID,
  identityTree,
  openToast,
}) => {
  try {
    const index = await spic.polls(CIRCLE_ID);
    const erc721 = new Contract(
      index.erc721Address,
      ERC721_ABI,
      library.getSigner(account)
    );
    console.log("erc ---", erc721);
    console.log("IC before request ---",IC)

    // const inserted = await identityTree.current.insert(IC);
    
    // debugger
    // console.log("inserted ---", inserted);
    console.log("erc721 --", erc721);
    // openToast("Kindly give approval for NFT on Metamask pop-up.");
    const approved = await erc721.approve(spic.address, NFT_ID);
    await approved.wait();
    // openToast("Becoming a voter...");
    const res = await spic.becomeVoter(CIRCLE_ID, IC, NFT_ID);
    await res.wait();
    const res1 = await Services.Post("/becomeVoter", {
      CIRCLE_ID: CIRCLE_ID,
      IC,
    });
    console.log("RES ===", res1);
    const polls = await spic.polls(CIRCLE_ID)
    const res2 = await Services.Post("/saveIndex", {
      IC,
      index: polls.voterIndex - 1,
      CIRCLE_ID
    });
    // await setStorageItem("NFT_ID", NFT_ID);
  } catch (e) {
    throw e;
  }
};

export const castVote = async ({
  spic,
  votingNullifier,
  name,
  contributer,
  identity,
}) => {
  try {
    const { nullifier, trapdoor, secret } = identity;

    const body = {
      nullifier: nullifier,
      trapdoor,
      secret,
      contributer,
      votingNullifier,
      CIRCLE_ID: name,
    };

    const res = await Services.Post("/", body);
    console.log("res from server ---", res);
    if (res.statusCode === 500) {
      throw res;
    }
    // const polls = await spic.polls(CIRCLE_ID.current)
    // console.log("polls before save",polls)
    // const res2 = await Services.Post("/saveIndex", {
    //   IC:votingNullifier,
    //   index: polls.votesIndex - 1
    // });
    // if (res2.statusCode === 500) {
    //   throw res;
    // }
    return res;
  } catch (e) {
    throw e;
  }
};
