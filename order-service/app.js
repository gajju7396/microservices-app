const express = require("express");
const axios = require("axios");
const client = require("prom-client");

const app = express();
const PORT = process.env.PORT || 3002;

client.collectDefaultMetrics();

app.get("/health", (req, res) => res.json({ status: "UP" }));

app.get("/orders", async (req, res) => {
  const users = await axios.get("http://user-service:3001/users");
  res.json({
    orderId: 101,
    user: users.data[0]
  });
});

app.get("/metrics", async (req, res) => {
  res.set("Content-Type", client.register.contentType);
  res.end(await client.register.metrics());
});

app.listen(PORT, () => {
  console.log(`Order service running on ${PORT}`);
});