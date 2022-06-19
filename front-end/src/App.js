import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RoutesList } from "./router";
import AppBar from "./component/appbar";
import { useEffect, useState } from "react";
import ethers from "ethers";
import {
  getStorageItem,
  setStorageItem,
  truncateAddress,
  walletContext,
} from "./utils";
// import { useHref } from "react-router-dom";

function App() {
  const ethereum = window.ethereum;
  let provider = "";
  let accounts = "";
  let network = "";
  // let navigate = useHref();

  const disConnectWallet = async () => {
    setWallet("");
    await setStorageItem("address","")
    window.location.href = "/";
    // navigate("/circle");
  };
  const [wallet, setWallet] = useState("");

  useEffect(() => {
    console.log("first time");
    // metamask();
    getWallet();
  }, []);

  const getWallet = async () => {
    const wallet = await getStorageItem("address");
    setWallet(wallet);
  };

  async function metamask() {
    if (typeof window.ethereum !== "undefined") {
      // Check if Ethereum User has metamask installed
      if (ethereum.isMetaMask) {
        // Use Mist/MetaMask's provider.
        provider = window["ethereum"];
        console.log("provider -->", provider);
        //get selected account on metamask
        accounts = await ethereum.send("eth_requestAccounts");
        network = ethereum.networkVersion;
        console.log("network -->", network);
        if (network == 1666700001) {
          console.log("accounts -->", accounts);
          setWallet(accounts.result[0]);
          setStorageItem("address", accounts.result[0]);
          const circleData = await getStorageItem("circleData");
          setStorageItem("circleData", circleData ? circleData : {});
          // get network which metamask is connected to (deprecated)
        } else {
          alert("Please Connect To Harmony Testnet");
        }
      } else {
        // meta mask is not installed.
        alert("Metamask not installed");
      }
    } else {
      /*** Ethereum User not detected. ***/
      alert("web3 user not detected");
    }
  }

  const props = {
    wallet,
    metamask,
    disConnectWallet,
  };
  return (
    <>
      {" "}
      <AppBar {...props} />
      <walletContext.Provider value={wallet}>
        {wallet && (
          <BrowserRouter>
            <Routes>
              {RoutesList.map((data, i) => {
                return (
                  <Route path={data.path} element={data.component} key={i} />
                );
              })}
            </Routes>
          </BrowserRouter>
        )}
      </walletContext.Provider>
    </>
  );
}

export default App;
