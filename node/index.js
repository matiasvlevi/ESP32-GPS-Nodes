const { readFileSync, writeFileSync, existsSync } = require('fs');
const getIP = require('./src/getIP');
const getDate = require('./src/getDate');

const config = require('dotenv').config({
  path: './node/.env'
}).parsed;
const port = config.PORT;

const express = require('express');
const server = express();

let api_data_path = './node/api/data.json';
const getData = (path) => {

  let data;
  if (existsSync(path))
    data = JSON.parse(readFileSync(path, 'utf-8'));
  else
    data = {};

  return data;
}

function getIPFromRequest(req) {
  let ip = (req.header('x-forwarded-for') || req.connection.remoteAddress).split(':');
  ip = ip[ip.length - 1];
  return ip;
}

// TODO: switch to TS for top level await
(async () => {
  // Get ip adress from ipconfig
  const ip = await getIP();

  // Current way of recieving from the ESP32
  server.get('/hit', (req, res) => {
    const nodeIp = getIPFromRequest(req);
    let msg =
      `[\x1b[36m${getDate()}\x1b[0m]` +
      `[\x1b[32m${nodeIp}\x1b[0m]  `;


    // Add data in message 
    for (let key in req.query) {
      msg += `${key}: ${req.query[key]}  `;
    }
    console.log(msg);
  });

  server.get('/register', (req, res) => {


    let macAdress = req.query.id || '';
    while (macAdress.includes(':'))
      macAdress = macAdress.replace(':', '');


    let data = getData(api_data_path);
    let microcontroller = {
      type: 'ESP32',
      ip: req.query.ip,
      mac: req.query.id
    }

    console.log(`ESP32 [${req.query.id}]`);
    data[macAdress] = microcontroller;
    writeFileSync(api_data_path, JSON.stringify(data), 'utf-8');

  });

  server.use(express.static(__dirname + '/api'));

  // Server listen
  server.listen(1880, () => {
    console.log(`Listener at http://${ip}:${port}`);
  });
})();