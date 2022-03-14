import express from 'express';

import utils from './methods/'
import logger from './logger/'
import network from './network/'

const server: express.Express = express();

// Current way of recieving from the ESP32
server.get('/hit', (req, res) => {
  // Get mac adress from call parameters
  if (typeof req.query.id !== 'string') return;

  network.load();

  network.update(req, req.query.id,
    {
      gps: {
        lon: req.query['lon'],
        lat: req.query['lat']
      },
      dht: {
        temperature: req.query['temperature'],
        humidity: req.query['humidity']
      }
    }
  );
  network.save();

  // Log update
  logger.hit(req.query.id, req.query);

  res.send({ status: "OK" });
});

server.get('/register', (req, res) => {
  // Get mac adress from call parameters
  if (typeof req.query.id !== 'string') return;

  // get the device IP from the client request
  const deviceIp = utils.getIPFromRequest(req);

  network.load();
  network.addDevice(req.query.id, deviceIp);
  network.save();

  // Display new device's info in the console
  logger.login(req.query.id);

  res.send({ status: "OK" });
});

server.get('/getDeviceDom', (req, res) => {
  if (typeof req.query.id !== 'string') return;
  res.setHeader('content-type', 'text/json');
  res.send(JSON.stringify({
    DOM: network.getDeviceDOM(req.query.id)
  }));
});

server.get('/getDeviceGPS', (req, res) => {
  if (typeof req.query.id !== 'string') return;
  res.setHeader('content-type', 'text/json');
  res.send(JSON.stringify(network.getDeviceGPS(req.query.id)));
});

// host the web application directory,
// allowing access to the 'data.json' through http, and map webpages.  
server.use(express.static(utils.getParentPath(2) + '/api'));

// Server listen
server.listen(network.SERVER_PORT, () => {
  console.log(`Listener at http://127.0.0.1:${network.SERVER_PORT}`);
});
