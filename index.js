const express = require("express");
const { networkInterfaces } = require("os");
const app = express();
const useragent = require('express-useragent');

let health = true;

app.use(useragent.express());

app.listen(3000, () => {
  console.log("Application started and Listening on port 3000");
});

app.get("/health", (req, res) => {
  res.status(health ? 200 : 401);
  res.send(
    JSON.stringify({
      data: health ? "Healthy" : "Not Healthy",
    })
  );
});

app.get("/health/flip", (req, res) => {
  health = !health;
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(
    JSON.stringify({
      data: health ? "Changed to Healthy" : "Changed to Not Healthy",
    })
  );
});

app.get("/getip", (req, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(
    JSON.stringify({
      data: req.useragent,
      xForward: req.headers['x-forwarded-for'] || req.socket.remoteAddress
    })
  );
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
