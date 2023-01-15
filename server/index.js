const express = require('express');
const fs = require('fs');
const path = require('path');
const moment = require('moment-timezone');

const location = moment.tz.guess(true);

const localMom = moment.tz(location);

const diffutc = localMom.format('Z');
const timezone = localMom.zoneAbbr();


const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.static(path.join(__dirname, 'static')))
app.get('/time', (req, res) => {
  res.send({
    location,
    timezone,
    diffutc,
    timestamp: moment.tz(location).unix()
  });
})

app.listen(3001, () => {
  console.log('http://localhost:3001')
})