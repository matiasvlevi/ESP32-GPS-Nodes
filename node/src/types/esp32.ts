import { gpsData } from './gps'

export type ESP32List = {
  [key: string]: Device;
}

export interface ESP32 {
  type: string;
  ip: string;
  mac: string;
  gps?: gpsData;
  lastUpdated: string;
  setPos(lon: string, lat: string): void;
}

export class Device implements ESP32 {
  type: string;
  ip: string;
  mac: string;
  gps?: gpsData;
  lastUpdated: string;
  constructor(mac: string, ip: string) {
    this.type = 'ESP32';
    this.ip = ip;
    this.mac = mac;
    this.gps = undefined;
    this.lastUpdated = new Date().toString();
  }
  setPos(lon: string, lat: string) {
    this.gps = { lon, lat }
  }
}

