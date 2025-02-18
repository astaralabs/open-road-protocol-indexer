import { db } from "ponder:api";
import { Hono } from "hono";
 
const app = new Hono();

app.get("/vehicle-data/:vin", async (c) => {
  const vin = c.req.param("vin");

  const vehicle = await db.query.vehicleData.findFirst({
    where: (table, { eq }) => eq(table.vin, vin)
  });
 
  return c.json(vehicle);
})

app.get("/attestations/:vin", async (c) => {
  const vin = c.req.param("vin");

  const attestations = await db.query.attestations.findMany({
    where: (table, { eq }) => eq(table.vin, vin)
  });
  
  return c.json(attestations);  
})

export default app;
