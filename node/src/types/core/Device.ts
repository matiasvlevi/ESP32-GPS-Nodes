
import { Microcontroller } from "./Microcontroller";

type DeviceConstructor<device> = { new(a: string, b: string): device };

class Device implements Microcontroller {
  type = 'Device';
  lastUpdated = new Date().toString();

  IP_ADDR; MAC_ADDR;
  constructor(mac: string, ip: string) {
    this.MAC_ADDR = mac; this.IP_ADDR = ip;
  }
}

export { Device, DeviceConstructor };