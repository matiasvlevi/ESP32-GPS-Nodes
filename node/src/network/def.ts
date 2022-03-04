import { readFileSync, writeFileSync, existsSync } from 'fs'
import { config as conf } from 'dotenv'


import getIPFromRequest from '../methods/getIpFromRequest'
import logger from '../logger'

import { ESP32, ESP32List, Device } from '../types'
import replaceAll from '../methods/replaceAll';

// Get .env contents
const config: any = conf({ path: './node/.env' }).parsed;

class Network {
  private devices: ESP32List;
  constructor() {
    this.devices = {};
  }
  public SERVER_PORT = config.PORT;
  addDevice(mac: string, ip: string = '') {
    this.devices[mac] = new ESP32(mac, ip);
  }
  parse(obj: ESP32) {
    this.devices[obj.mac] = obj;
  }
  getDevice(mac: string): ESP32 | undefined {
    if (!Object.keys(this.devices).includes(mac)) return;
    return this.devices[mac];
  }
  update(req: any, mac: string, lon: string, lat: string) {
    // Register device before updating if wasnt registered.
    if (!Object.keys(this.devices).includes(mac)) {
      const deviceIp = getIPFromRequest(req);
      this.addDevice(mac, deviceIp);
    };
    this.devices[mac].gps = {
      lon: `${lon}`,
      lat: `${lat}`
    }
    this.devices[mac].lastUpdated = new Date().toString();
  }
  load(path: string = config.API_PATH) {
    if (existsSync(path)) {
      let devices: ESP32List = JSON.parse(readFileSync(path, 'utf-8'));
      for (let mac in devices) {
        this.parse(devices[mac]);
      }
    } else {
      logger.error("API JSON file does not exist");
    }
  }
  save() {
    writeFileSync(config.API_PATH, JSON.stringify(
      this.devices
    ), 'utf-8');
  }
}

export default Network;