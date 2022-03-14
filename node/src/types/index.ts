import  EnviroPack  from "./devices/enviropack"
import ESP32 from "./devices/esp32"
import { gpsData } from './sensors/gps'
import { dhtData } from './sensors/dht'
import { Microcontroller } from "./core/Microcontroller"
import { DeviceConstructor, Device } from "./core/Device"



type Multi = Device | ESP32 | EnviroPack;

export {
  Microcontroller,
  DeviceConstructor,
  // Device containing all interfaces
  Multi,

  // Data formats
  gpsData,
  dhtData
}
