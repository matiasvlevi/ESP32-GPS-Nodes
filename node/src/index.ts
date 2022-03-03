
import express from 'express';

import getIPFromRequest from './methods/getIpFromRequest'
import getParentPath from './methods/getParentPath'

import logger from './logger/'
import network from './network/'
import { ESP32, Device } from './types/'

const server: express.Express = express();

// Current way of recieving from the ESP32
server.get('/hit', (req) => {
  const nodeIp = getIPFromRequest(req);

  // Get device with the same IP
  let device: Device | undefined = network.findByIP(nodeIp);
  if (device === undefined) return;

  // Inject GPS coordinates
  device.setPos(
    `${req.query['lon']}`,
    `${req.query['lat']}`
  );

  // Write the device list
  network.update(device);
  network.save();

  // Log update
  logger.hit(device.ip, req.query);
});

server.get('/register', (req) => {
  const macAdress: string = `${req.query.id}`;
  const nodeIp = getIPFromRequest(req);

  network.load();

  let microcontroller: ESP32 = new Device(macAdress, nodeIp);

  logger.login(macAdress);
  network.update(microcontroller);
  network.save();
});

console.log(getParentPath(2));

server.use(express.static(getParentPath(2) + '/api'));

// Server listen
server.listen(network.PORT, () => {
  console.log(`Listener at http://127.0.0.1:${network.PORT}`);
});
