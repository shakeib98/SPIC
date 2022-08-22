import View from "./view";
import { BigNumber, Contract, ethers } from "ethers";
import { useEffect, useRef, useState } from "react";
import { format, compareAsc, getTime } from "date-fns";
import parseISO from "date-fns/parseISO";
import {
  createIdentity,
  getStorageItem,
  NFT_ADDRESS,
  prove,
  setStorageItem,
  SPIC_ADDRESS,
} from "../../util";
import { useRouter } from "next/router";
import { useWeb3React } from "@web3-react/core";
import useNFTContract from "../../hooks/useNFTContract";
import useSpicContract from "../../hooks/useSpicContract";
import { MerkleTree } from "../../classes/merkletree";
import { PoseidonHasher } from "../../classes/poseidonHasher";
import Services from "../../classes/fetch";
import { becomeVoter, castVote } from "../../services";
import { useToast } from "@chakra-ui/toast";

const buildPoseidon = require("circomlibjs").buildPoseidon;

function Index() {
  // STATES
  const [table, setTable] = useState({});
  const [voteTable, setVoteTable] = useState([]);

  const [nft, setNft] = useState("");
  const [becomeVoterModal, setBecomeVoterModal] = useState(false);

  const [withdrawNftModal, setwithdrawNftModal] = useState(false);
  const [contributer, setContributor] = useState("");
  const [circleIndex, setCircleIndex] = useState({
    voterIndex: 0,
    votesIndex: 0,
  });

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const [isVoterCompleted, setIsVoterCompleted] = useState(true);
  const [castVoteModal, setCastVoteModal] = useState(false);

  const [loader, setLoader] = useState(false);

  const identityTree = useRef();
  const votingTree = useRef();

  const votingNullifierRef = useRef("");
  const CIRCLE_ID = useRef("");

  const router = useRouter();

  const { name } = router.query;
  const { account, library } = useWeb3React();

  const spic = useSpicContract();
  const toast = useToast();

  let [identity, setIdentity] = useState({
    nullifier: "",
    trapdoor: "",
    secret: "",
  });

  useEffect(() => {
    if (name) fetchData();
    // if (account && CIRCLE_ID.current) fetchVotersCount();
  }, [account, name]);

  // useEffect(() => {
  //   if (!votingTree.current && !identityTree.current) {
  //     console.log("initializing the tree");
  //     initializeTree();
  //   }
  // }, []);

  const fetchVotersCount = async () => {
    try {
      console.log("circle id ---", CIRCLE_ID.current);
      console.log("circle id type ---", typeof CIRCLE_ID.current);
      const index = await Services.Post("/getIndex", {
        CIRCLE_ID: name,
      });
      const polls = await spic.polls(name);

      console.log("pollsss ---", polls);

      setCircleIndex(index.data[0]);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchData = async () => {
    const circleData = await Services.Get("/circle/" + name);
    console.log("circle data got ---", circleData);
    setTable(circleData.data[0]);
  };

  const onBecomeVoterClick = async () => {
    try {
      if (!account) {
        openToast("Connect to Metamask to become a voter!!");
      } else if (getTime(new Date(table.epochTo)) < Date.now()) {
        openToast("Epoch has ended!!");
      } else if (!nft) {
        openToast("Please enter NFT id to continue.");
      } else {
        setLoader(true);
        console.log("got tree ---", votingTree);
        const NFT_ID = nft;

        const poseidonJs = await buildPoseidon();
        const identityLocal = await createIdentity();

        console.log("identity  ---", identityLocal);
        setIdentity({ ...identityLocal });
        const IC = poseidonJs.F.toObject(
          poseidonJs([
            identityLocal.nullifier,
            identityLocal.trapdoor,
            identityLocal.secret,
          ])
        );

        console.log("IC ---", IC);
        console.log("identity Tree ---", identityTree);

        await becomeVoter({
          CIRCLE_ID: name,
          IC,
          library,
          account,
          identityTree,
          NFT_ID,
          spic,
          openToast,
        });

        await fetchData();

        const rootSPIC = await spic.groups(name);

        console.log("root spics ---", rootSPIC.root.toString());
        setIsVoterCompleted(true);
        // toggleBecomeVoterModal();
        openToast("You have successfully became a voter :)");
      }
      // else {
      //   openToast("You are already a voter in this organization");
      // }
      // toggleBecomeVoterModal();
      setLoader(false);
    } catch (e) {
      setLoader(false);
      console.log("errrrr", e);
      openToast(e.message);
    }
  };

  const onVoteClick = async () => {
    try {

      if (getTime(new Date(table.epochTo)) < Date.now()) {
        openToast("Epoch has ended!!");
      } else {
        setLoader(true);
        console.log("identity parameters ---", identity);
       
        const poseidonJs = await buildPoseidon();
        const { nullifier, trapdoor, secret } = identity;

        console.log("type ---", nullifier, CIRCLE_ID.current, contributer);

        const votingNullifier = poseidonJs.F.toObject(
          poseidonJs([
            nullifier,
            name,
            contributer.toString().trim(),
          ])
        );

        votingNullifierRef.current = votingNullifier;

        console.log("votingNullifier for voter ---", votingNullifier);

        const OnVoteResponse = await castVote({
          spic,
          name,
          contributer,
          identity,
          votingNullifier,
        });
        await fetchData();

        if (OnVoteResponse) {
          // getVotingDetails[isVoter].receiver_address = contributer;
          // getVotingDetails[isVoter].votingNullifier = votingNullifier;
          // await setStorageItem("votingDetails", getVotingDetails);

          openToast(
            `You have successfully casted a vote to ${contributer}`,
            true
          );
          onToggleCastVoteModal();
        }
        // } else {
        //   openToast("Kindly become a voter to cast a voter.");
        // }
      }
      setLoader(false);
    } catch (e) {
      setLoader(false);
      console.log("errr --", e);
      openToast("Failed: Something went wrong while casting a vote.");
    }
  };

  const withdrawNFT = async () => {
    try {
      if (getTime(new Date(table.epochTo)) > Date.now()) {
        openToast("Epoch has not ended yet!!");
      }
      else if (account) {
        setLoader(true);
        const poseidonJs = await buildPoseidon();

        const { nullifier, trapdoor, secret } = identity;
        const votingNullifier = poseidonJs.F.toObject(
          poseidonJs([
            nullifier,
            name,
            contributer.toString().trim(),
          ])
        );
        const res1 = await Services.Post("/withdraw", {
          CIRCLE_ID: name,
          votingNullifier,
        });
        console.log("res1 ---", res1);
        var Input = {
          identityNullifier: nullifier.toString(),
          merklePath: res1.data[0].path_elements,
          pathIndices: res1.data[0].path_index,
          circle_id: name.toString(),
          pk: contributer,
          mRoot: BigNumber.from(res1.data[0].root).toString(),
        };
        console.log("Input --->", Input);
        const solProof = await prove(Input);

        const proofForFunction = [
          solProof.a[0],
          solProof.a[1],
          solProof.b[0][0],
          solProof.b[0][1],
          solProof.b[1][0],
          solProof.b[1][1],
          solProof.c[0],
          solProof.c[1],
        ];
        console.log("proof ---", proofForFunction);
        const res = await spic.withdrawNFT(
          votingNullifier,
          BigNumber.from(res1.data[0].root).toString(),
          name,
          contributer,
          proofForFunction
        );
        console.log("ress of withdraw ---", res);
        await res.wait();
        await fetchData();
        togglewithdrawNftModal()
        // getVotingDetails[isVoter].withdrawn = true;
        // await setStorageItem("votingDetails", getVotingDetails);
        openToast(
          `NFT has been successfully withdrawn.`
        );
        // }
        // else {
        //   openToast(
        //     "Kindly vote for any contributer first to withdraw your NFT!!"
        //   );
        // }
        setLoader(false);
      } else {
        openToast("Connect to Metamask to withdraw NFT!!");
      }
    } catch (e) {
      setLoader(false);
      console.log("error in withdraw ---", e);
      openToast(e.message);
    }
  };

  const onGetReward = async () => {
    try {
      if (getTime(new Date(table.epochTo)) < Date.now()) {
        openToast("Epoch has not ended yet!!");
      } else {
        const res = await spic.receiveCompensation(name);
        await res.wait();
        openToast("You have successfully received the compensation.", true);
        console.log("resss ---", res);
      }
    } catch (e) {
      openToast(e.message);
      console.log(e);
    }
  };

  const toggleBecomeVoterModal = () => {
    setBecomeVoterModal(!becomeVoterModal);
    setIsVoterCompleted(false);
    setIdentity({
      nullifier: "",
      trapdoor: "",
      secret: "",
    });
  };

  const togglewithdrawNftModal = () => {
    setwithdrawNftModal(!withdrawNftModal);
    setIdentity({
      nullifier: "",
      trapdoor: "",
      secret: "",
    });
  };

  const onChange = (e) => {
    setNft(e.target.value);
  };

  const onChangeAddress = (e) => {
    setContributor(e.target.value);
  };

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const openToast = (text, success) => {
    toast({
      description: text,
      status: success ? "success" : "info",
      duration: 4000,
      isClosable: true,
    });
  };

  const onChangeIdentity = (e) => {
    console.log("e --", e);
    setIdentity({ ...identity, [e.target.name]: e.target.value });
  };

  const onToggleCastVoteModal = async (address) => {
    if (!castVoteModal) {
      setCastVoteModal(true);
      console.log("contributer toggle ---", address);
      setContributor(address);
    } else {
      setContributor("");
      setCastVoteModal(false);
    }
    setIdentity({
      nullifier: "",
      trapdoor: "",
      secret: "",
    });
  };

  const props = {
    table,
    onChange,
    name,
    voteTable,
    onBecomeVoterClick,
    toggleBecomeVoterModal,
    becomeVoterModal,
    nft,
    togglewithdrawNftModal,
    withdrawNFT,
    withdrawNftModal,
    contributer,
    onChangeAddress,
    circleIndex,
    handleClick,
    handleClose,
    open,
    message,
    identity,
    isVoterCompleted,
    onChangeIdentity,
    onToggleCastVoteModal,
    castVoteModal,
    onVoteClick,
    loader,
    openToast,
    account,
    onGetReward
  };
  return (
    <>
      <View {...props} />
    </>
  );
}

export default Index;
