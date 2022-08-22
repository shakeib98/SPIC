import View from "./view";
import { BigNumber, ethers, Contract } from "ethers";
import { useEffect, useState } from "react";
import { getStorageItem, setStorageItem } from "../../util";
import { useRouter } from "next/router";
import { useWeb3React } from "@web3-react/core";
import useSpicContract from "../../hooks/useSpicContract";
import { getTime, getISODay, formatISO } from "date-fns";
import useTokenContract from "../../hooks/useTokenContract";
import { ERC20_ADDRESS } from "../../util";
import { toUtf8Bytes } from "@ethersproject/strings";
import ERC20_ABI from "../../contracts/ERC20.json";
import { format } from "date-fns";
import Services from "../../classes/fetch";
import { useToast } from "@chakra-ui/toast";

const buildPoseidon = require("circomlibjs").buildPoseidon;

function Index(prop) {
  const [userData, setData] = useState({
    // name: "",
    address: "",
    circleName: "",
    organizationName: "",
    erc20: "",
    erc20Amount: "",
    nft: "",
    incentive: "",
  });

  const [epoch, setEpoch] = useState({
    from: format(new Date(), "dd/MM/yyyy"),
    to: format(Date.now() + 8.64e7, "dd/MM/yyyy"),
  });
  const [epochUnformat, setUnformatEpoch] = useState({
    from: formatISO(new Date()),
    to: formatISO(new Date(Date.now() + 8.64e7)),
  });

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const [loader, setLoader] = useState(false);

  const { account, library } = useWeb3React();
  // const erc20 = useTokenContract(ERC20_ADDRESS);
  const router = useRouter();
  const toast = useToast();
  const spic = useSpicContract();
  const isConnected = typeof account === "string" && !!library;

  const onLaunchCircleClick = async () => {
    try {
      if (
        userData.circleName.toString().trim() &&
        userData.organizationName.toString().trim() &&
        userData.erc20.toString().trim() &&
        userData.erc20Amount.toString().trim() &&
        userData.nft.toString().trim() &&
        userData.incentive.toString().trim() &&
        epoch.from.toString().trim() &&
        epoch.to.toString().trim()
      ) {
        setLoader(true);
        const MINUTES = 8;

        const matchAmount = ethers.utils.parseUnits(userData.erc20Amount);
        const CIRCLE_ID = BigNumber.from(
          toUtf8Bytes(
            `${userData.organizationName}-${Math.floor(Math.random() * 100000)}`
          )
        ).toString();

        const erc20 = new Contract(
          userData.erc20,
          ERC20_ABI,
          library.getSigner(account)
        );
        openToast("Kindly give approval for tokens on Metamask pop-up.");
        const res1 = await erc20.approve(spic.address, matchAmount);
        const confirm = await res1.wait();
        openToast("Creating Circle...");

        console.log(
          "created ---",
          CIRCLE_ID,
          matchAmount,
          Number(userData.incentive) * 10,
          userData.erc20,
          userData.nft,
          getTime(new Date(epochUnformat.to))
        );

        const res = await spic.createCircle(
          CIRCLE_ID,
          matchAmount,
          Number(userData.incentive) * 10,
          userData.erc20,
          userData.nft,
          // Math.floor(Date.now() / 1000) + MINUTES * 60 // Timestamp hard-coded for testing
          getTime(new Date(epochUnformat.to))
        );
        console.log("ressss -->", res);
        await res.wait();
        const createRes = await Services.Post("/createCircle", {
          _id: CIRCLE_ID,
          name: userData.circleName,
          adminAddress: account,
          organizationName: userData.organizationName,
          erc20Address: userData.erc20,
          erc721Address: userData.nft,
          erc20Amount: userData.erc20Amount,
          incentive: userData.incentive,
          contributors: [],
          // epochFrom: formatISO(new Date()), // Hardcoded for testing
          // epochTo: formatISO(new Date(Date.now() + MINUTES * 60000)), // Hardcoded for testing
          epochFrom: epochUnformat.from,
          epochTo: epochUnformat.to,
        });

        setLoader(false);
        openToast("Circle Successfully created, redirecting...", true);
        setTimeout(() => {
          router.push("/admin/" + createRes.data[0]._id);
        }, 1000);
      } else {
        openToast("Kindly provide all the information to proceed.");
      }
    } catch (e) {
      setLoader(false);
      openToast(e.message);
      console.log("error --", e);
    }
  };

  const onChange = (e) => {
    setData({ ...userData, [e.target.name]: e.target.value });
  };

  const onDateChange = (name, value) => {
    setEpoch({
      ...epoch,
      [name]: format(new Date(value.toString()), "dd/MM/yyyy"),
    });
    setUnformatEpoch({
      ...epochUnformat,
      [name]: formatISO(new Date(value.toString())),
    });
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
      duration: 9000,
      isClosable: true,
    });
  };

  const props = {
    userData,
    epoch,
    onChange,
    onLaunchCircleClick,
    onDateChange,
    isConnected,
    account,
    open,
    message,
    handleClick,
    handleClose,
    loader,
  };
  return (
    <>
      <View {...props} />
    </>
  );
}

export default Index;
