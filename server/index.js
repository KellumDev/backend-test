import express from "express";
import workerRoute from "/code/routes/worker.route.js";
import locationRoute from "/code/routes/location.route.js";

const app = express();
const port = 3000;

async function main() {
  

  app.get("/", (req, res) => {
    res.send("Welcome to the labor tracking app!");
  });
  //worker routes
  app.use("/api", workerRoute);
  //location routes
  app.use("/api", locationRoute);

  app.listen(port, "0.0.0.0", () => {
    console.info(`App listening on ${port}.`);
  });
}

await main();
