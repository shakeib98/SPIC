import { useWeb3React } from '@web3-react/core'
import { Button, Icon } from '@chakra-ui/react'
import { getNetwork, switchNetwork } from '../util'

const Network = () => {
  const { chainId, account } = useWeb3React()

  if (typeof account !== 'string') {
    return null
  }

  return <Button>{getNetwork(chainId)}</Button>
}

export default Network
