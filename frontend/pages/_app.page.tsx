import { Web3ReactProvider } from '@web3-react/core'
import type { AppProps } from 'next/app'
import getLibrary from '../getLibrary'
import '../styles/globals.css'
// import AppBar from '../components/navbar'
import useEagerConnect from '../hooks/useEagerConnect'
import { ChakraProvider, useColorMode } from '@chakra-ui/react'
import Navbar from '../components/navbar'

function NextWeb3App({ Component, pageProps }: AppProps) {
  const triedToEagerConnect = useEagerConnect()

  const AnyComponent = Component as any
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <ChakraProvider>
        <Navbar />
        <AnyComponent {...pageProps} />
      </ChakraProvider>
    </Web3ReactProvider>
  )
}

export default NextWeb3App
