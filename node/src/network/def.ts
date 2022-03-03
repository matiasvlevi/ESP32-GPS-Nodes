import { readFileSync, writeFileSync, existsSync } from 'fs';

import { ESP32, ESP32List, Device } from '../types/'
import { config as conf } from 'dotenv';

import replaceAll from '../methods/replaceAll'
import logger from '../logger';

const config: any = conf({ path: './node/.env' }).parsed;

class Network {
  devices: ESP32List;
  constructor() {
    this.devices = {};
  }
  public PORT = config.PORT;
  update(device: Device) {
    this.devices[replaceAll(device.mac, ':')] = new Device(device.mac, device.ip);
  }
  load(path: string = config.API_PATH) {
    if (existsSync(path)) {
      let data: any = JSON.parse(readFileSync(path, 'utf-8'));
      for (let d of data) {
        console.log(data[d])
        this.update(data[d]);
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
  findByIP(value: string): Device | undefined {
    let ans: Device[] = Object.values(this.devices).filter((x: Device) => {
      return x.ip.includes(value);
    });

    if (ans.length === 0) return;

    return ans[0];
  }

}

export default Network;