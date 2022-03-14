import { gpsData, GPS } from '../sensors/gps'
import { Microcontroller } from '../core/Microcontroller';

class ESP32 implements Microcontroller, GPS {
  type = this.constructor.name;
  lastUpdated = new Date().toString();

  IP_ADDR; MAC_ADDR;
  constructor(mac: string, ip: string) {
    this.MAC_ADDR = mac; this.IP_ADDR = ip;
  }

  gps?: gpsData = undefined;
  setGps(lon: number, lat: number) {
    this.gps = { lon, lat }
  }
  getGps() {
    return this.gps;
  }
}

export default ESP32;