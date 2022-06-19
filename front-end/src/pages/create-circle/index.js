import View from "./view";
import ethers from "ethers";
import { useEffect, useState } from "react";
import { getStorageItem, setStorageItem, truncateAddress } from "../../utils";
import { useNavigate } from "react-router-dom";

function Index() {
  const [userData, setData] = useState({
    // name: "",
    address: "",
    circleName: "",
    organizationName: "",
  });
  const [epoch, setEpoch] = useState({
    from: null,
    to: null,
  });

  let navigate = useNavigate();

  const onLaunchCircleClick = async () => {
    //   debugger
    const circleData = await getStorageItem("circleData");
    const address = await getStorageItem("address");
    console.log("dataaa -->", circleData);
    console.log("address -->", address);
    // navigate("/admin");
    if (circleData && circleData[address]) {
      alert("This address already have circle");
    } else {
      const data = { user: userData, epoch };
      circleData[address] = data;
      await setStorageItem("circleData", circleData);
      navigate("/admin");
    }
  };
  const onChange = (e) => {
    setData({ ...userData, [e.target.name]: e.target.value });
  };

  const onDateChange = (name, value) => {
    setEpoch({ ...epoch, [name]: value });
  };

  const props = {
    userData,
    epoch,
    onChange,
    onLaunchCircleClick,
    onDateChange,
  };
  return (
    <>
      <View {...props} />
    </>
  );
}

export default Index;
