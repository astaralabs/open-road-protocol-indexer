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
      address: "0xc33d1F7ea74548A252a7Bff224A351D90EA5E5c7",
      startBlock: 17519125,
    },

    Storage: {
      network: "baseSepolia",
      abi: StorageAbi,
      address: "0xA75411e860B449182aeaC95211EFD363996C907D",
      startBlock: 17523840
    }
  },
});
