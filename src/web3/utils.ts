import { ethers } from "ethers";
import { getKeys } from "../vault";

export async function blockchainConnection() {
    const keys = getKeys()
    return new ethers.JsonRpcProvider(keys.ALCHEMY_URL_BASE_SEPOLIA);
}
  
export async function signerConnection(signerPrivateKey: string) {
    const provider = await blockchainConnection();
  
    const signer = new ethers.Wallet(signerPrivateKey, provider);
    
    return signer;
}

export function timestampToString(time: BigInt) {
  const date = new Date(Number(time) * 1000);

  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const year = date.getUTCFullYear();
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');

  return `${day}/${month}/${year} ${hours}:${minutes}`;

}