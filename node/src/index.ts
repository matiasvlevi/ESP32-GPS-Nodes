import { readFileSync, writeFileSync, existsSync } from 'fs'
import getIP from './methods/getIP';
import getDate from './methods/getDate'
import { config as conf, DotenvParseOutput } from 'dotenv';

const config: any = conf({ path: './node/.env' }).parsed;

const port = config.PORT;

import express from 'express';
const server: express.Express = express();

let api_data_path = './node/api/data.json';
const getData = (path: string) => {

  let data;
  if (existsSync(path))
    data = JSON.parse(readFileSync(path, 'utf-8'));
  else
    data = {};

  return data;
}

function getIPFromRequest(req: any) {
  let ip = (req.header('x-forwarded-for') || req.connection.remoteAddress).split(':');
  ip = ip[ip.length - 1];
  return ip;
}

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
    let macAdress: string = (`${req.query.id}`) || '';
    while (macAdress.includes(':'))
      macAdress = macAdress.replace(':', '');

    const nodeIp = getIPFromRequest(req);
    let data: any = getData(api_data_path);
    let microcontroller = {
      type: 'ESP32',
      ip: nodeIp,
      mac: req.query.id,
      lastUpdated: new Date().toString()
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
})()