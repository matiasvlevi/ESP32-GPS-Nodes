import { gpsData, GPS } from './gps'
import { dhtData, DHT } from './dht'


export interface Device {
  type: string;
  ip: string;
  mac: string;
  lastUpdated: string;
}

// Other property "templates" can be added for different peripherials
// export interface MySensor {
//   value: string;
//   setValue(newValue: string): void;
// }
// 
// class ESP8266 implements Device, MySensor { ... }

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
