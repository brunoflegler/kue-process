const kue = require("kue");
const express = require("express");
const app = express();
const ui = require("kue-ui");
const configRedis = require("../config/redis");
const configServer = require("../config/server");

const q = kue.createQueue({
  prefix: "q",
  redis: {
    host: configRedis.host,
    port: configRedis.port,
    db: configRedis.db
  }
});

const jobs = () => {
  const job = q
    .create("work1", {
      title: `Processes ${new Date()}`
    })
    .attempts(3) //numeros de tentativas
    .backoff({ delay: 1 * 1000, type: "fixed" }) //atrasar o envio das falhas
    .priority(-10) //prioridade high
    .removeOnComplete(true) //remove do redis quando completado
    .save();
  setTimeout(jobs, 500);
};

jobs();

ui.setup({
  apiURL: "/api", // IMPORTANT: specify the api url
  baseURL: "/kue", // IMPORTANT: specify the base url
  updateInterval: 500 // Optional: Fetches new data every 5000 ms
});

// Mount kue JSON api
app.use("/api", kue.app);
// Mount UI
app.use("/kue", ui.app);

app.listen(configServer.port);
