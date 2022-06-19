import View from "./view"
// import web3 from "web3"
import ethers from "ethers"
import { useEffect, useState } from "react";
import { truncateAddress } from "../../utils";
import { useNavigate } from "react-router-dom";

function Index() {


    let navigate = useNavigate();

    const createACircle = () => {
        navigate("/circle")
    }

    const props = {
        createACircle
    }

    return <>
        <View {...props} />
    </>;
}

export default Index;