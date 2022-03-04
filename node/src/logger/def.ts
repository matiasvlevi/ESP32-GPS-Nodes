import getDate from "../methods/getDate";
import { ESP32 } from "../types/"

class Logger {
  constructor() { }
  login(device: ESP32) {
    console.log(
      `Device [\x1b[32m${device.mac}\x1b[0m] logged in ` +
      `with ip  [\x1b[32m${device.ip}\x1b[0m]`
    );
  }
  error(msg: string) {
    console.error("Error >> " + msg);
  }
  hit(device: ESP32, data: any) {
    // Log update
    let msg =
      `[\x1b[36m${getDate()}\x1b[0m]` +
      `[\x1b[32m${device.ip}\x1b[0m]  `;

    // Add data in message 
    for (let key in data) {
      msg += `${key}: ${data[key]}  `;
    }
    console.log(msg);
  }
}

export default Logger;