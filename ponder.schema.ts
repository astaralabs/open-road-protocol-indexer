import { onchainTable } from "ponder";


export const vehicleData = onchainTable("vehicles", (t) => ({
  vin: t.text().primaryKey(),
  make: t.text().notNull(),
  model: t.text().notNull(),
  owner: t.text().notNull(),
  vehicle_wallet: t.text().notNull()
}))

export const attestations = onchainTable("attestations", (t) => ({
  attestation_uid: t.text().primaryKey(),
  vin: t.text().notNull(),
  type: t.text().notNull(),
  vehicle_wallet: t.text().notNull()
}))
