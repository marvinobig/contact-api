const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const nodemailer = require("nodemailer");
const app = express();

// API configuration
dotenv.config();
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));

//email endpoint
app.post("api/email", (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
});

// error handler
app.all("*", (req, res) => {
  res.status(404).send("Route Not Found");
});

app.use((err, req, res) => {});

module.exports = app;
