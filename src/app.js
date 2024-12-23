// src/app.js
const express = require("express");
const bodyParser = require("body-parser");
const notifications = require("./routes/notifications");

const app = express();
app.use(bodyParser.json());
app.use("/api", notifications);

module.exports = app;
