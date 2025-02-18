import {
    EAS, 
    SchemaEncoder
  } from "@ethereum-attestation-service/eas-sdk";
import { signerConnection } from "./utils";
import { getContracts, getKeys } from "../vault";

const keys = getKeys()
const adminKey = keys.ADMIN_PRIVATE_KEY as string;

async function easConnection() {
    //Initialize SDK
    const contractAddresses = getContracts()
    const easContract = contractAddresses.EAS_CONTRACT_ADDRESS!;
    const eas = new EAS(easContract);
  
    //Connect to attest
    const signer = await signerConnection(adminKey);
    eas.connect(signer);
    return eas;
  }

  export async function getAttestation(attestUID: string) {
    const eas = await easConnection();
    const attestation = await eas.getAttestation(attestUID);
    return attestation;
  }

  export function decodeOdometerData(encodedData: string) {
    const schemaEncoder = new SchemaEncoder("uint256 kilometres")
    const data = schemaEncoder.decodeData(encodedData);
    return data;
  } 