import View from "./view";
import ethers from "ethers";
import { useEffect, useState } from "react";
import { format, compareAsc } from "date-fns";
import parseISO from 'date-fns/parseISO'
import { getStorageItem, truncateAddress } from "../../utils";

function Index() {
  const [circleData, setData] = useState({});
  const [contributerModal, setContributerModal] = useState(false);
  const [epochModal, setEpochModal] = useState(false);
  const [table, setTable] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await getStorageItem("circleData");
    const address = await getStorageItem("address");
    console.log("got datqa", data);
    data[address].user.address = address;
    const mutated = { user: data[address].user, epoch: data[address].epoch };
    setData(mutated);

    const tableData = {
      epoch: {
        From: format(parseISO(data[address].epoch.from),'MM/dd/yyyy'),
        To: format(parseISO(data[address].epoch.to),'MM/dd/yyyy'),
      },
      users: { "Eth Address": address, "Match Tokens": 100, Admin: "Yes" },
    };
    setTable(tableData);
  };

  const addContributers = async () => {};

  const onContributorToggle = () => {
    setContributerModal(!contributerModal);
  };

  const onEpochToggle = () => {
    setEpochModal(!epochModal);
  };

  const props = {
    circleData,
    onContributorToggle,
    onEpochToggle,
    contributerModal,
    epochModal,
    table,
  };
  return (
    <>
      <View {...props} />
    </>
  );
}

export default Index;
