
import express from 'express';

import getIPFromRequest from './methods/getIpFromRequest'
import getParentPath from './methods/getParentPath'

import logger from './logger/'
import network from './network/'
import { ESP32, Device } from './types/'

const server: express.Express = express();

// Current way of recieving from the ESP32
server.get('/hit', (req) => {
  // get the device IP from the client request
  const deviceIp = getIPFromRequest(req);

  // Get device with the same IP, abort if does not exist
  // A non registered device can't call '/hit'
  let device: ESP32 | undefined = network.findByIP(deviceIp);
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
  logger.hit(device, req.query);
});

server.get('/register', (req) => {
  // Get mac adress from call parameters
  const macAdress: string = `${req.query.id}`;

  // get the device IP from the client request
  const deviceIp = getIPFromRequest(req);

  // Load most recent device network from json
  network.load();

  // Create a device instance out of this information
  let device: Device = new ESP32(macAdress, deviceIp);

  // Update the device in the device network data
  network.update(device);

  // Save the device network data
  network.save();

  // Display new device's info in the console
  logger.login(device);
});

console.log(getParentPath(2));

server.use(express.static(getParentPath(2) + '/api'));

// Server listen
server.listen(network.PORT, () => {
  console.log(`Listener at http://127.0.0.1:${network.PORT}`);
});
