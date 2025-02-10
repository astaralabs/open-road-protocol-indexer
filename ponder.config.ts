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
      address: "0xb3f50B115691b092446dE51131a4852169F37101",
      startBlock: 17519125,
    },

    Storage: {
      network: "baseSepolia",
      abi: StorageAbi,
      address: "0x76A1b434b39ccb465D18eb144a7c6012ceB58eDB",
      startBlock: 17523840
    }
  },
});
