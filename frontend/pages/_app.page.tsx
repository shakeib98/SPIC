import { Web3ReactProvider } from "@web3-react/core";
import type { AppProps } from "next/app";
import getLibrary from "../getLibrary";
import "../styles/globals.css";
import AppBar from "../components/appbar";
import useEagerConnect from "../hooks/useEagerConnect";

function NextWeb3App({ Component, pageProps }: AppProps) {
  const triedToEagerConnect = useEagerConnect();
  const AnyComponent = Component as any;
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <AppBar triedToEagerConnect={triedToEagerConnect} />
      <AnyComponent {...pageProps} />
    </Web3ReactProvider>
  );
}

export default NextWeb3App;
