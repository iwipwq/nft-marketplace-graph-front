// eip-1193
interface RequestArguments {
    readonly method: string;
    readonly params?: readonly unknown[] | object;
  }

declare function EthRequest(args:RequestArguments):unknown

export interface EthereumProvider {
    isMetaMask?: boolean;
    request: typeof EthRequest;
}

declare global {
    interface Window {
        ethereum?: EthereumProvider;
    }
}

// networkMapping

// type ChainId = string | number;

// interface NftMarketplace {
//   nftMarketplace: Array<string>;
// }

// export interface NetworkMapping {
//   [chainId: ChainId]: NftMarketplace;
// }
