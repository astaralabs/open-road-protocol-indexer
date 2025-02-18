import { ponder } from "ponder:registry";
import {attestations, vehicleData} from "ponder:schema";

import { StorageAbi } from "../../abis/storageAbi";
import { decodeOdometerData, getAttestation } from "./attest";
import { replaceBigInts } from "ponder";
import { getContracts } from "../vault";

const contractAddresses = getContracts()
const storageAddress = contractAddresses.STORAGE_ADDRESS 

ponder.on("VDIDContract:NewMasterToken", async ({ event, context }) => {
  const { client } = context;

  const vdidInfo = await client.readContract({
    abi: StorageAbi,
    address: storageAddress,
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
    address: storageAddress,
    functionName: "getAttestationsOf",
    args: [vehicle_wallet, key]
  })

  const vin = await client.readContract({
    abi: StorageAbi,
    address: storageAddress,
    functionName: "getVINByAccount",
    args: [vehicle_wallet]
  })

  const uid = attestationInfo.at(-1)!;
  const attestation = await getAttestation(uid);
  let attester;

  if(attestation.attester == "0x031c727eFC8797e9BF037B284B82632203393923") {
    attester = "Astara"
  } else {
    attester = "Independent"
  }

  if (key == "odometer") {
    
    const decodedData = decodeOdometerData(attestation.data)
    const parsedValue = replaceBigInts(decodedData[0]?.value.value, (v) => String(v))
    
    const result = {"Key": decodedData[0]?.value.name, "Value": parsedValue}

    await context.db.insert(attestations).values({
      attestation_uid: uid,
      type: key,
      attester,
      vin,
      value: result,
      vehicle_wallet
    })
  } else {
    await context.db.insert(attestations).values({
      attestation_uid: uid,
      type: key,
      attester,
      vin,
      vehicle_wallet
    })
  }
})

