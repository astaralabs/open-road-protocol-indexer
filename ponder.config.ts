import { createConfig } from "ponder";
import { http } from "viem";

import { VDIDAbi } from "./abis/vdidAbi";
import { StorageAbi } from "./abis/storageAbi"

console.log("Creating config... The base url: ", process.env.ALCHEMY_URL_BASE_SEPOLIA, "The db: ", process.env.DATABASE_SCHEMA)

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
      address: "0x6A8935Ff9Ac2f540600680de45acBB1925808315",
      startBlock: 17519125,
    },

    Storage: {
      network: "baseSepolia",
      abi: StorageAbi,
      address: "0x4C0d9719F1f6F3300b312335cfcC4Cd78cfa14A6",
      startBlock: 17523840
    }
  },
});
