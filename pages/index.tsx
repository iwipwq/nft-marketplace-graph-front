import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useMoralis, useMoralisQuery } from "react-moralis";
import styles from "../styles/Home.module.css";
import NFTBox from "../components/NFTBox";
import networkMapping from "../constants/networkMapping.json";
import { useQuery } from "@apollo/client";
import GET_ACTIVE_ITEMS from "../constants/subgraphQueries";

interface INft {
  nftAddress: string;
  price: string;
  seller: string;
  tokenId: string;
}

interface nftMarketplace {
  nftMarketplace: string[];
}

interface NetworkMapping {
  [chainId: string]: nftMarketplace;
}

const Home: NextPage = () => {
  const { isWeb3Enabled, chainId } = useMoralis();
  const chainString = chainId ? parseInt(chainId).toString() : "31337";
  const marketplaceAddress = (networkMapping as NetworkMapping)[chainString]
    .nftMarketplace[0];

  const { loading, error, data: listedNfts } = useQuery(GET_ACTIVE_ITEMS);

  // const {
  //   data: listedNfts,
  //   isFetching: fetchingListedNfts,
  //   error: reqError,
  // } = useMoralisQuery(
  //   // TableName
  //   // Function for the query
  //   "ActiveItem",
  //   (query) => query.limit(10).descending("tokenId")
  // );
  // console.log(fetchingListedNfts);
  // console.log(reqError);

  // nft: { attributes: { createdAt: any; marketplaceAddress: any; nftAddress: any; price: any; seller: any; tokenId: any; updatedAt: any; }; }

  console.log(loading);
  console.log(error);
  console.log(listedNfts);

  return (
    <div className="container mx-auto">
      <h1 className="py-4 px-4 font-bold text-2xl">최근 등록됨</h1>
      <div className="flex flex-wrap gap-4">
        {isWeb3Enabled ? (
          loading || !listedNfts ? (
            <div>"로딩중 ... "</div>
          ) : (
            listedNfts.activeItems.map((nft: INft) => {
              console.log(nft);
              const { nftAddress, price, seller, tokenId } = nft;
              return (
                <NFTBox
                  price={price}
                  nftAddress={nftAddress}
                  tokenId={tokenId}
                  marketplaceAddress={marketplaceAddress}
                  seller={seller}
                  key={`${nftAddress}${tokenId}`}
                />
              );
            })
          )
        ) : (
          <div>web3 연결이 끊어졌습니다.</div>
        )}
      </div>
    </div>
  );
};

export default Home;
