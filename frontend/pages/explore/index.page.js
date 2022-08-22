import View from "./view"
// import web3 from "web3"
import ethers from "ethers"
import { useEffect, useState } from "react";
import { getStorageItem, truncateAddress } from "../../util";
import { useRouter } from "next/router";
import Services from "../../classes/fetch";


function Index() {

    const [circles,setCircles] = useState([])
    const router = useRouter()

    useEffect(() => {
        fetchCircles()
    },[])

    const fetchCircles = async () => {
        const publicCircles = await Services.Get("/getAllCircles")
        console.log("public circles ---",publicCircles.data[0])
        setCircles(publicCircles.data[0])
    }

    const navigateToVotePage = (name) => {
        router.push("/vote/"+name)
    }

    const props = {
        navigateToVotePage,
        circles
    }

    return <>
        <View {...props} />
    </>;
}

export default Index;