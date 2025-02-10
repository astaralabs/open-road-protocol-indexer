import { createConfig } from "ponder";
import { http } from "viem";

import { VDIDAbi } from "./abis/vdidAbi";
import { StorageAbi } from "./abis/storageAbi"

export default createConfig({
  database: {
    kind: "postgres",
    connectionString: process.env.DATABASE_SCHEMA
  },
  networks: {
    baseSepolia: {
      chainId: 84532,
      transport: http(process.env.ALCHEMY_URL_BASE_SEPOLIA),
    },
  },
  contracts: {
    VDIDContract: {
      network: "baseSepolia",
      abi: VDIDAbi,
      address: "0xe9fDeC572A1B512eB9c978C0703dED0D77AF0BBb",
      startBlock: 17519125,
    },

    Storage: {
      network: "baseSepolia",
      abi: StorageAbi,
      address: "0xd2B25E4E0a858C7f47B26d118BbDD88B125A20E2",
      startBlock: 17523840
    }
  },
});
