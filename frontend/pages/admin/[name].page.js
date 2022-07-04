import View from "./view";
import ethers from "ethers";
import { useEffect, useState } from "react";
import { format, compareAsc } from "date-fns";
import parseISO from "date-fns/parseISO";
import { getStorageItem, setStorageItem, truncateAddress } from "../../util";
import { useWeb3React } from "@web3-react/core";
import { useRouter } from "next/router";
import useSpicContract from "../../hooks/useSpicContract";

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
    const data = await getStorageItem("circleData");
    const publicCircles = await getStorageItem("publicCircles");

    console.log("got datqa", data[account]);
    let filtered = data[account] ? data[account].filter((el) => el.user.id === name) : []
    console.log("filtered ---",filtered)
    if (data && account && filtered.length) {
      filtered = filtered[0]
      filtered.user.address = account;

      const mutated = { user: filtered.user, epoch: filtered.epoch };

      setData(mutated);

      console.log("fetch ---", publicCircles);
      // if (!publicCircles[0]?.users?.length) {
      //   const tableData = [
      //     {
      //       epoch: {
      //         // From: format(parseISO(filtered.epoch.from), "MM/dd/yyyy"),
      //         // To: format(parseISO(filtered.epoch.to), "MM/dd/yyyy"),
      //         From: filtered.epoch.from,
      //         To: filtered.epoch.to,
      //       },
      //       users: [{ Contributers: "", Admin: "" }],
      //       circle: filtered.user.circleName,
      //       organization: filtered.user.organizationName,
      //       id: filtered.user.id,
      //     },
      //   ];
      //   console.log("first time ---", tableData[0]);
      //   setTable(tableData[0]);

      //   await setStorageItem("publicCircles", tableData);
      // } else {
        console.log("running else ---", publicCircles);
        for (let i = 0; i < publicCircles.length; i++) {
          if (publicCircles[i].id === name) {
            console.log("inside loop ---", publicCircles[i]);
            setTable(publicCircles[i]);
            break;
          }
        }
      // }
    } else {
      openToast("Create a circle to manage it.");
    }
  };

  const onChange = (e, i) => {
    const newAddresses = [...contributerAddress];
    newAddresses[i].address = e.target.value;
    setAddress(newAddresses);
  };

  const addContributers = async () => {
    try {
      setLoader(true);
      const data = await getStorageItem("circleData");
      const publicCircles = await getStorageItem("publicCircles");

      const availableContributers = [];
      const contributerAddresesArray = [];

      contributerAddress.forEach((el) => {
        console.log(
          "contriiii ",
          contributerAddress[el],
          el,
          contributerAddress
        );

        if (el.address) {
          const contributer = {
            Contributers: el.address.toLowerCase(),
            Admin: el.address === account ? "Yes" : "No",
          };

          contributerAddresesArray.push(el.address.toLowerCase());

          availableContributers.push(contributer);
        }
      });
      console.log("available ---", availableContributers);
      let CIRCLE_ID = "";
      let index = 0;
      for (let i = 0; i < publicCircles.length; i++) {
        if (publicCircles[i].id === name) {
          index = i;
          CIRCLE_ID = publicCircles[i].id;
          if (!publicCircles[i].users[0].Contributers) {
            console.log("shifting---");
            publicCircles[i].users.shift();
          }
          console.log("shifted ---", publicCircles[i].users);
          publicCircles[i].users.push(...availableContributers);
          console.log("pushing ---", publicCircles[i].users);
          break;
        }
      }

      console.log("idddd", CIRCLE_ID);
      openToast("Adding contributor to the circle.");
      const res = await spic.addContributors(
        CIRCLE_ID,
        contributerAddresesArray
      );
      await res.wait();
      await setStorageItem("publicCircles", publicCircles);

      const mutatedTable = { ...table };
      console.log("mutated ---", mutatedTable);
      mutatedTable.users = [...publicCircles[index].users];

      setTable(mutatedTable);
      setLoader(false);
      openToast("Contributor successfully added.");
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
    if (contributerAddress.length < 4) {
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

  const openToast = (text) => {
    setMessage(text);
    handleClick();
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
