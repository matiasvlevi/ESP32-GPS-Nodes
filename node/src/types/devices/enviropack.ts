import { gpsData, GPS } from '../sensors/gps'
import { dhtData, DHT } from '../sensors/dht'
import { Microcontroller } from '../core/Microcontroller';

/**
 *
 * @class EnviroPack
 * To demonstrate that we can add more property sets to our Devices type.
 *
 * If we ever have devices with multiple sensors, this is how we define them.
 */
class EnviroPack implements Microcontroller, GPS, DHT {
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

  dht?: dhtData = undefined;
  setDht(temperature: number, humidity: number) {
    this.dht = { temperature, humidity }
  }
  getDht() {
    return this.dht;
  }
}

export default EnviroPack;