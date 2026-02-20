const express = require("express");
const client = require("prom-client");

const app = express();
const PORT = process.env.PORT || 3001;

client.collectDefaultMetrics();

app.get("/health", (req, res) => res.json({ status: "UP" }));

app.get("/users", (req, res) => {
  res.json([{ id: 1, name: "Gajju" }]);
});

app.get("/metrics", async (req, res) => {
  res.set("Content-Type", client.register.contentType);
  res.end(await client.register.metrics());
});

app.listen(PORT, () => {
  console.log(`User service running on ${PORT}`);
});