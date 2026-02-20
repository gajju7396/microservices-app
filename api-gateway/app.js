const express = require("express");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/users", async (req, res) => {
  const response = await axios.get("http://user-service:3001/users");
  res.json(response.data);
});

app.get("/orders", async (req, res) => {
  const response = await axios.get("http://order-service:3002/orders");
  res.json(response.data);
});

app.listen(PORT, () => {
  console.log(`API Gateway running on ${PORT}`);
});