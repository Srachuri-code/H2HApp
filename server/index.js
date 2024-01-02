const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const client = require('twilio')(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(pino);

app.get('/api/greeting', (req, res) => {
  const name = req.query.name || 'World';
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
});

app.post('/api/messages', (req, res) => {
  res.header('Content-Type', 'application/json');
  
  const toNumbers = req.body.to.split(','); // Splitting the 'to' field into an array of numbers
  
  const promises = toNumbers.map((phoneNumber) => {
    return client.messages.create({
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phoneNumber.trim(), // Trim to remove any whitespace
      body: req.body.body
    });
  });
  
  Promise.all(promises)
    .then(() => {
      res.send(JSON.stringify({ success: true }));
    })
    .catch(err => {
      console.error(err);
      res.send(JSON.stringify({ success: false }));
    });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});