import View from './view';
import { useWeb3React } from '@web3-react/core'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Services from '../../classes/fetch'
import useEagerConnect from '../../hooks/useEagerConnect'
import { getStorageItem, setStorageItem } from '../../util'

function Index() {
  const [isUserDataExist, setUserDataBool] = useState(false)
  const [userCircles, setUserCircles] = useState([])

  const { account, library } = useWeb3React()
  const router = useRouter()
  const triedToEagerConnect = useEagerConnect();

  const isConnected = typeof account === 'string' && !!library

  console.log({ isConnected })

  const fetchUserInfo = async () => {
    const res = await Services.Get('/user/'+account)
    console.log("res of user data", res)
    // const data = await getStorageItem('circleData')
    // const publicCircles = await getStorageItem("publicCircles");
    const circles = res.data.length ? res.data : []
    if (res.data && res.data.length) {
      setUserDataBool(true)
    }
    setUserCircles(res.data)
  }

  useEffect(() => {

    if(!userCircles.length && account)
    fetchUserInfo()
  }, [account])

  const props = {
    account,
    userCircles,
    isUserDataExist,
    library,
    fetchUserInfo,
    isConnected,
    router,
    triedToEagerConnect
  }

  return (
    <>
      <View {...props} />
    </>
  );
}
export default Index;
