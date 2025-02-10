import { ponder } from "ponder:registry";
import {attestations, vehicleData} from "ponder:schema";

import { StorageAbi } from "../abis/storageAbi";

const StorageAddress = "0xd2B25E4E0a858C7f47B26d118BbDD88B125A20E2" //Beta address. Modify to use different environments

ponder.on("VDIDContract:NewMasterToken", async ({ event, context }) => {
  const { client } = context;

  const vdidInfo = await client.readContract({
    abi: StorageAbi,
    address: StorageAddress,
    functionName: "getVDIDOf",
    args: [event.args[0]]
  })

  await context.db.insert(vehicleData).values({
    vin: vdidInfo.data.VIN,
    make: vdidInfo.data.make,
    model: vdidInfo.data.model,
    owner: vdidInfo.nftOwner,
    vehicle_wallet: vdidInfo.ERC6551Account
  })
});

ponder.on("Storage:NewAttestation", async ({event, context}) => {
  const { client } = context;
  const vehicle_wallet = event.args[0];
  const key = event.args[1];

  const attestationInfo = await client.readContract({
    abi: StorageAbi,
    address: StorageAddress,
    functionName: "getAttestationsOf",
    args: [vehicle_wallet, key]
  })

  console.log("THE ATTEST INFO: ", attestationInfo)

  const vin = await client.readContract({
    abi: StorageAbi,
    address: StorageAddress,
    functionName: "getVINByAccount",
    args: [vehicle_wallet]
  })

  console.log("THe vin: ", vin)

  await context.db.insert(attestations).values({
    attestation_uid: attestationInfo.at(-1)!,
    vin: vin,
    type: key,
    vehicle_wallet: vehicle_wallet
  })
})

ponder.get("/vehicle-data/:vin", async (c) => {
  const vin = c.req.param("vin");

  const vehicle = await c.db.query.vehicleData.findFirst({
    where: (table, { eq }) => eq(table.vin, vin)
  });
 
  return c.json(vehicle);
})


ponder.get("/attestations/:vin", async (c) => {
  const vin = c.req.param("vin");

  const attestations = await c.db.query.attestations.findMany({
    where: (table, { eq }) => eq(table.vin, vin)
  });
 
  return c.json(attestations);
})

