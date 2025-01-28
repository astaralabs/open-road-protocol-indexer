import { ponder } from "ponder:registry";
import {vdid, vehicleData} from "ponder:schema";
import { StorageAbi } from "../abis/storageAbi";

ponder.on("VDIDContract:NewMasterToken", async ({ event, context }) => {
  const { client } = context;

  const StorageAddress = "0x4C0d9719F1f6F3300b312335cfcC4Cd78cfa14A6"

  const vdidInfo = await client.readContract({
    abi: StorageAbi,
    address: StorageAddress,
    functionName: "getVDIDOf",
    args: [event.args[0]]
  })

  await context.db.insert(vdid).values({
    tokenId: event.args[0],
    tokenWallet: vdidInfo.ERC6551Account,
    user_owner: vdidInfo.nftOwner,
    vin: vdidInfo.data.VIN
  })

  await context.db.insert(vehicleData).values({
    vin: vdidInfo.data.VIN,
    make: vdidInfo.data.make,
    model: vdidInfo.data.model
  })
});

