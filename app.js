const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const nodemailer = require("nodemailer");
const reqValidator = require("./middlewares/reqValidator");
const app = express();

// API configuration
dotenv.config();
app.use(express.json());
app.use(cors({ origin: `${process.env.CLIENT}` }));

//email endpoint
app.post("/api/contact", reqValidator, (req, res, next) => {
  try {
    const { sender, subject, name, message } = req.body;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_ADDR,
        pass: process.env.PASS,
      },
    });

    transporter.verify((err) => {
      err
        ? console.log(`Email server failed: ${err}`)
        : console.log("Email server is ready");
    });

    const mail = {
      to: process.env.EMAIL_TO,
      subject: subject,
      html: `
        <p>Hello Marvin,</p>
        <br/>
        <p>${message}</p>
        <p>Reply back to this email: ${sender}</p>
        <br/>
        <p>Kind regards,<br/>
        ${name}</p>
        `,
    };

    transporter.sendMail(mail, (err, info) => {
      err
        ? console.log(err)
        : res
            .status(200)
            .send({ msg: `Sent successfully`, msg_id: info.messageId });
    });
  } catch (err) {
    next(err);
  }
});

// error handler
app.all("*", (req, res) => {
  res.status(404).send("Route Not Found");
});

module.exports = app;
