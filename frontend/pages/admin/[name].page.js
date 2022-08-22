import View from "./view";
import { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { useRouter } from "next/router";
import useSpicContract from "../../hooks/useSpicContract";
import Services from "../../classes/fetch";

function Index() {
  // STATES
  const [circleData, setData] = useState({});
  const [contributerModal, setContributerModal] = useState(false);

  const [epochModal, setEpochModal] = useState(false);
  const [table, setTable] = useState({});

  const [contributerAddress, setAddress] = useState([
    {
      address: "",
    },
  ]);

  const [loader, setLoader] = useState(false);

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const spic = useSpicContract();

  const { account, library } = useWeb3React();
  // const router = useRouter();
  const router = useRouter();
  const { name } = router.query;

  const isConnected = typeof account === "string" && !!library;

  useEffect(() => {
    if (account) fetchData();
  }, [account]);

  const fetchData = async () => {
    // debugger
    const circleData = await Services.Get("/circle/" + name);
    console.log("circleData ---", circleData);
    setData(circleData.data[0]);
  };

  const onChange = (e, i) => {
    console.log("onchange of address --", e, i);
    if (i >= 0) {
      const newAddresses = [...contributerAddress];
      newAddresses[i].address = e.target.value;
      setAddress(newAddresses);
    }
  };

  const addContributers = async () => {
    try {
      setLoader(true);
      const addressArray = [];
      contributerAddress.forEach(
        (el) => el.address.trim() && addressArray.push(el.address.trim())
      );
      const spicRes = await spic.addContributors(circleData._id, addressArray);
      await spicRes.wait();
      const res = await Services.Post("/addContributors", {
        circleID: circleData._id,
        contributors: addressArray,
      });
      console.log("res of contributors", res);
      await fetchData();

      setLoader(false);
      onContributorToggle();
    } catch (e) {
      setLoader(false);
      openToast(e.message);
      console.log(e);
    }
  };

  const onContributorToggle = () => {
    setContributerModal(!contributerModal);
    setAddress([{ address: "" }]);
  };

  const onEpochToggle = () => {
    setEpochModal(!epochModal);
  };

  const onAddField = () => {
    const allowedSpace = 4 - circleData.contributors.length;
    console.log("allowed ---", allowedSpace);
    if (contributerAddress.length < allowedSpace) {
      const newField = [...contributerAddress, { address: "" }];
      setAddress(newField);
    }
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
    circleData,
    onContributorToggle,
    onEpochToggle,
    contributerModal,
    epochModal,
    table,
    onChange,
    contributerAddress,
    addContributers,
    isConnected,
    account,
    onAddField,
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
