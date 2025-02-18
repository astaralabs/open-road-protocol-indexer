import crypto from "crypto";
import * as fs from "fs";
import * as dotenv from "dotenv";

dotenv.config();

function encryptFile(content: string, env: string) {
  const encryptionKey = process.env.SYMMETRIC_KEY as string;
  const encryptionIV = process.env.INITIALIZATION_VECTOR as string;

  const key = crypto.createHash("sha256").update(encryptionKey).digest();
  const iv = crypto.createHash("md5").update(encryptionIV).digest(); //initialization vector must have 16 bytes

  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
  let encryptedText = cipher.update(content, "utf8", "hex");
  encryptedText += cipher.final("hex");

  const path = __dirname + `/../config/secrets/${env}.json.enc`;

  fs.writeFileSync(path, encryptedText);
}

function decryptFile(path: string) {
  const fileContent = fs.readFileSync(path, "utf-8");
  const decryptionKey = process.env.SYMMETRIC_KEY as string;
  const decryptionIV = process.env.INITIALIZATION_VECTOR as string;

  const key = crypto.createHash("sha256").update(decryptionKey).digest();
  const iv = crypto.createHash("md5").update(decryptionIV).digest(); //initialization vector must have 16 bytes

  const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
  let decrypted = decipher.update(fileContent, "hex", "utf-8");
  decrypted += decipher.final("utf-8");
  const keys: Record<string, any> = JSON.parse(decrypted);
  return keys;
}

export function addOrUpdateKey(key: string, value: string, env: string) {
  const keys = getKeys(env);

  key = key.toUpperCase();
  keys[key] = value;

  const stringKeys = JSON.stringify(keys);
  encryptFile(stringKeys, env);
}

export function removeKey(key: string, env: string) {
  let keys = getKeys(env);

  key = key.toUpperCase();
  delete keys[key];

  const stringKeys = JSON.stringify(keys);
  encryptFile(stringKeys, env);
}

export function newEnvironment(keys: Record<string, any>, envName: string) {
  const stringKeys = JSON.stringify(keys);
  encryptFile(stringKeys, envName);
}

export function getEnvFile(env: string) {
  // In dev, we want to be flexible and allow defining our own configs witout being encrypted
  if (env !== "development") {
    return {};
  }
  try {
    return dotenv.parse(fs.readFileSync(".env"));
  } catch (e) {
    console.log("could not load .env file");
    return {};
  }
}

export function getKeys(env?: string) {
  const _env = env || getCurrentEnv();

  if (_env === undefined)
    throw new Error("env not found or not correctly setup as env variable DEPLOY_ENV");
  const envKeys = getEnvFile(_env);
  const secretKeys = getSecretKeys(_env);
  return { ...envKeys, ...secretKeys };
}

function getSecretKeys(env: string) {
  try {
    const path = __dirname + `/../config/secrets/${env}.json.enc`;
    const keys = decryptFile(path);
    return keys;
  } catch (e) {
    console.log(e);
    console.log("could not load secret keys");
    return {};
  }
}

export function getCurrentEnv() {
  const _env = process.env.DEPLOY_ENV;
  if (_env === "" || _env === undefined) {
    throw new Error("No environment available");
  }

  return _env;
}

export function getContracts() {
  try {
    const env = getCurrentEnv();
    const path = __dirname + `/../config/contracts/${env}.json`;
    const fileContent = fs.readFileSync(path, "utf-8");
    const contracts = JSON.parse(fileContent);
    return contracts;
  } catch (e) {
    console.log(e);
    return {};
  }
}

