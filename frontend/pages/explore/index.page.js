import View from "./view"
// import web3 from "web3"
import ethers from "ethers"
import { useEffect, useState } from "react";
import { getStorageItem, truncateAddress } from "../../util";
import { useRouter } from "next/router";


function Index() {

    const [circles,setCircles] = useState([])
    const router = useRouter()

    useEffect(() => {
        fetchCircles()
    },[])

    const fetchCircles = async () => {
        const publicCircles = await getStorageItem("publicCircles");
        setCircles(publicCircles)
    }

    const createACircle = (name) => {
        router.push("/vote/"+name)
    }

    const props = {
        createACircle,
        circles
    }

    return <>
        <View {...props} />
    </>;
}

export default Index;