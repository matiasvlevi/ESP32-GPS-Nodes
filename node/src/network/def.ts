import { readFileSync, writeFileSync, existsSync } from 'fs'
import { config as conf } from 'dotenv'
import Handlebars from 'handlebars'
import utils from '../methods'
import path from 'path'

import logger from '../logger'

import { DeviceConstructor, Multi } from '../types'

// Get .env contents
const config: any = conf({ path: './node/.env' }).parsed;
type MAP = {
  [key: string]: any
}

class Network<T extends Multi> {
  private devices: MAP;
  deviceType: DeviceConstructor<T>;
  constructor(deviceType: DeviceConstructor<T>) {
    this.devices = {};
    this.deviceType = deviceType;
    this.load();
  }
  public SERVER_PORT = config.PORT;
  addDevice(mac: string, ip: string = '') {
    this.devices[mac] = new this.deviceType(mac, ip);
  }
  parse(obj: T) {
    this.devices[obj.MAC_ADDR] = new this.deviceType(obj.MAC_ADDR, obj.IP_ADDR);

    if ('setGps' in this.devices[obj.MAC_ADDR] && 'gps' in obj) {
      this.devices[obj.MAC_ADDR].setGps(obj.gps?.lon, obj.gps?.lat);
    }
    if ('setDht' in this.devices[obj.MAC_ADDR] && 'dht' in obj) {
      this.devices[obj.MAC_ADDR].setDht(obj.dht?.temperature, obj.dht?.humidity);
    }
  }
  getDevice(mac: string): T | undefined {
    if (!Object.keys(this.devices).includes(mac)) return;
    return this.devices[mac];
  }
  getDeviceDOM(mac: string) {
    if (!Object.keys(this.devices).includes(mac)) return;

    let source = readFileSync(path.join(__dirname, '../../templates/marker-content.handlebars'), 'utf-8');
    let template = Handlebars.compile(source);
    return template(this.devices[mac]);
  }
  // TODO: refactor for dynamic sensors,
  // Get reference from type in order to create apropriate getters.
  getDeviceDHT(mac: string) {
    if (!Object.keys(this.devices).includes(mac)) return;
    return this.devices[mac].getDht() || {};
  }
  getDeviceGPS(mac: string) {
    if (!Object.keys(this.devices).includes(mac)) return;
    return this.devices[mac].getGps() || {};
  }
  update(req: any, mac: string, data: any) {
    // Register device before updating if wasnt registered.
    if (!Object.keys(this.devices).includes(mac)) {
      const deviceIp = utils.getIPFromRequest(req);
      this.addDevice(mac, deviceIp);
    };

    let isUpdated: boolean = false;

    if ('setGps' in this.devices[mac]) {
      if (typeof data.gps.lat === 'string') {
        this.devices[mac].setGps(+data.gps.lon, +data.gps.lat);
        isUpdated = true;
      }
    }
    if ('setDht' in this.devices[mac]) {
      if (typeof data.dht.humidity === 'string') {
        this.devices[mac].setDht(+data.dht.temperature, +data.dht.humidity);
        isUpdated = true;
      }
    }

    if (isUpdated)
      this.devices[mac].lastUpdated = new Date().toString();
  }
  load(path: string = config.API_PATH) {
    if (existsSync(path)) {
      let devices: MAP = JSON.parse(readFileSync(`${path}/data.json`, 'utf-8'));
      for (let mac in devices) {
        this.parse(devices[mac]);
      }
    } else {
      logger.error("API JSON file does not exist");
    }
  }
  save() {
    writeFileSync(`${config.API_PATH}/adresses.json`, JSON.stringify(
      Object.keys(this.devices)
    ), 'utf-8');
    writeFileSync(`${config.API_PATH}/data.json`, JSON.stringify(
      this.devices
    ), 'utf-8');
  }
}

export default Network;