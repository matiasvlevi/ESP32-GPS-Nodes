import { gpsData, GPS } from './gps'
import { dhtData, DHT } from './dht'

export interface WiFi {
  ip: string;
}

export interface Device extends WiFi {
  type: string;
  mac: string;
  lastUpdated: string;
}

export class ESP32 implements Device, GPS {
  type: string = 'ESP32';
  lastUpdated: string = new Date().toString();

  ip: string; mac: string;
  constructor(mac: string, ip: string) {
    this.ip = ip; this.mac = mac;
  }

  gps?: gpsData = undefined;
  setGps(lon: string, lat: string) {
    this.gps = { lon, lat }
  }
}

export type ESP32_KEYMAP = {
  [key: string]: ESP32;
}
