import View from "./view";
import { BigNumber, ethers, Contract } from "ethers";
import { useEffect, useState } from "react";
import { getStorageItem, setStorageItem } from "../../util";
import { useRouter } from "next/router";
import { useWeb3React } from "@web3-react/core";
import useSpicContract from "../../hooks/useSpicContract";
import { getTime, getISODay } from "date-fns";
import useTokenContract from "../../hooks/useTokenContract";
import { ERC20_ADDRESS } from "../../util";
import { toUtf8Bytes } from "@ethersproject/strings";
import ERC20_ABI from "../../contracts/ERC20.json";
const buildPoseidon = require("circomlibjs").buildPoseidon;

function Index() {
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
    from: new Date(Date.now()),
    to: new Date(Date.now() + 8.64e7),
  });

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const [loader, setLoader] = useState(false);

  const { account, library } = useWeb3React();
  // const erc20 = useTokenContract(ERC20_ADDRESS);
  const router = useRouter();

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
        const circleData = await getStorageItem("circleData");
        const publicCircles = await getStorageItem("publicCircles");

        const MINUTES = 8;

        const matchAmount = ethers.utils.parseUnits(userData.erc20Amount);
        const CIRCLE_ID = BigNumber.from(
          toUtf8Bytes(
            `${userData.organizationName}-${Math.floor(Math.random() * 10000)}`
          )
        ).toString();
        // const CIRCLE_ID =  "507256308655616800666673" // HARD-CODED for testing

        const dataToPush = { ...userData, id: CIRCLE_ID };
        const data = { user: dataToPush, epoch };
        if (circleData && circleData[account] && circleData[account].length) {
          circleData[account].push(data);
        } else {
          circleData[account] = [data];
        }
        const erc20 = new Contract(
          userData.erc20,
          ERC20_ABI,
          library.getSigner(account)
        );
        openToast("Kindly give approval for tokens on Metamask pop-up.");
        const res1 = await erc20.approve(spic.address, matchAmount);
        const confirm = await res1.wait();
        console.log("approved --", getTime(epoch.to));
        // let circle = await spic.polls(CIRCLE_ID)
        openToast("Creating Circle...");
        const res = await spic.createCircle(
          CIRCLE_ID,
          matchAmount,
          Number(userData.incentive) * 10,
          userData.erc20,
          userData.nft,
          Math.floor(Date.now() / 1000) + MINUTES * 60 // Timestamp hard-coded for testing
          // getTime(epoch.to)
        );
        console.log("ressss -->", res);
        await res.wait();
        setLoader(false);
        openToast("Circle Successfully created, redirecting...");
        console.log("before setting ---", circleData);
        await setStorageItem("circleData", circleData);
        const pubData = {
          epoch: {
            From: data.epoch.from,
            To: data.epoch.to,
          },
          users: [{ Contributers: "", Admin: "" }],
          circle: data.user.circleName,
          organization: data.user.organizationName,
          id: data.user.id,
        };
        publicCircles.push(pubData);
        await setStorageItem("publicCircles", publicCircles);
        router.push("/admin/" + CIRCLE_ID);
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
    setEpoch({ ...epoch, [name]: value });
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

  const openToast = (text) => {
    setMessage(text);
    handleClick();
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
