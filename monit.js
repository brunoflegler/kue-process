const kue = require("kue");
const express = require("express");
const app = express();
var ui = require("kue-ui");

kue.createQueue({
  prefix: "q",
  redis: {
    host: "127.0.0.1",
    port: 6379,
    db: 1
  }
});

ui.setup({
  apiURL: "/api", // IMPORTANT: specify the api url
  baseURL: "/kue", // IMPORTANT: specify the base url
  updateInterval: 5000 // Optional: Fetches new data every 5000 ms
});

// Mount kue JSON api
app.use("/api", kue.app);
// Mount UI
app.use("/kue", ui.app);

app.listen(3000);
