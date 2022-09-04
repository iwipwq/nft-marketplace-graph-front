import "../styles/globals.css";
import type { AppProps } from "next/app";
import Header from "../components/Header";
import { MoralisProvider } from "react-moralis";
import Head from "next/head";
import { NotificationProvider } from "web3uikit";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: process.env.NEXT_PUBLIC_GRAPH_URI,
});

function MyApp({ Component, pageProps }: AppProps, DUMMY: any) {
  return (
    <>
      <Head>
        <title>NFT 마켓</title>
        <meta name="description" content="NFT를 거래할 수 있는 장터입니다." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MoralisProvider initializeOnMount={false}>
        <ApolloProvider client={client}>
          <NotificationProvider {...DUMMY}>
            <Header />
            <Component {...pageProps} />
          </NotificationProvider>
        </ApolloProvider>
      </MoralisProvider>
    </>
  );
}

export default MyApp;
