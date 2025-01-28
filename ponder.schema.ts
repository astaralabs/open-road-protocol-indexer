import { onchainTable } from "ponder";

export const vdid = onchainTable("vdid", (t) => ({
  tokenId: t.bigint().primaryKey(),
  tokenWallet: t.text().notNull(),
  user_owner: t.text().notNull(),
  vin: t.text().notNull(),
}));

export const vehicleData = onchainTable("vehicles", (t) => ({
  vin: t.text().primaryKey(),
  make: t.text().notNull(),
  model: t.text().notNull(),
}))

//This table will cointain the last attestation of each type, being the type the column name
export const attestations = onchainTable("lastAttestations", (t) => ({
  vin: t.text().primaryKey(),
  odometer: t.text()
}))
