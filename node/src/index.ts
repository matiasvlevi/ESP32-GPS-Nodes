import express from 'express';

import utils from './methods/'
import logger from './logger/'
import network from './network/'

const server: express.Express = express();

// Current way of recieving from the ESP32
server.get('/hit', (req) => {
  // Get mac adress from call parameters
  if (typeof req.query.id !== 'string') return;
  let mac: string = req.query.id;

  network.load();

  // Write the device list
  network.update(req, mac, `${req.query['lon']}`, `${req.query['lat']}`);

  network.save();

  // Log update
  logger.hit(mac, req.query);
});

server.get('/register', (req) => {
  // Get mac adress from call parameters
  if (typeof req.query.id !== 'string') return;
  let mac: string = req.query.id;

  // get the device IP from the client request
  const deviceIp = utils.getIPFromRequest(req);

  // Load device network data 
  network.load();

  // Update the device in the device network data
  network.addDevice(mac, deviceIp);

  // Save the device network data
  network.save();

  // Display new device's info in the console
  logger.login(mac);
});

// host the web application directory,
// allowing access to the 'data.json' through http, and map webpages.  
server.use(express.static(utils.getParentPath(2) + '/api'));

// Server listen
server.listen(network.SERVER_PORT, () => {
  console.log(`Listener at http://127.0.0.1:${network.SERVER_PORT}`);
});
