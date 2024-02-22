const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors")({origin: true});
const bodyParser = require("body-parser");
const pino = require("express-pino-logger")();
const client = require("twilio")(
    functions.config().twilio.accountsid,
    functions.config().twilio.authtoken,
);

const app = express();
app.use(cors);
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(pino);

app.get("/api/greeting", (req, res) => {
  const name = req.query.name || "World";
  res.setHeader("Content-Type", "application/json");
  res.send(JSON.stringify({greeting: `Hello ${name}!`}));
});

app.post("/api/messages", (req, res) => {
  res.header("Content-Type", "application/json");

  const toNumbers = req.body.to.split(",");

  const promises = toNumbers.map((phoneNumber) => {
    return client.messages.create({
      from: functions.config().twilio.phonenumber,
      to: phoneNumber.trim(), // Trim to remove any whitespace
      body: req.body.body,
    });
  });

  Promise.all(promises)
      .then(() => {
        res.send(JSON.stringify({success: true}));
      })
      .catch((err) => {
        console.error(err);
        res.send(JSON.stringify({success: false}));
      });
});

exports.api = functions.https.onRequest(app);
