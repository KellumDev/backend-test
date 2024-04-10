import express from "express";
import workerRoute from '/code/routes/worker.route.js';
import locationRoute from '/code/routes/location.route.js';
import * as mariadb from "mariadb";

const app = express();
const port = 3000;
let db;

async function connect() {
  console.info("Connecting to DB...");
  db = mariadb.createPool({
    host: process.env["DATABASE_HOST"],
    user: process.env["DATABASE_USER"],
    password: process.env["DATABASE_PASSWORD"],
    database: process.env["DATABASE_NAME"]
  });

  const conn = await db.getConnection();
  try {
    await conn.query("SELECT 1");
  } finally {
    await conn.end();
  }
}

async function main() {
  await connect();

  app.get("/", (req, res) => {
    res.send("Welcome to the labor tracking app!");
  });
  //worker routes
  app.use('/api', workerRoute);
  //location routes
  app.use('/api', locationRoute);

  app.listen(port, "0.0.0.0", () => {
    console.info(`App listening on ${port}.`);
  });
}

await main();
