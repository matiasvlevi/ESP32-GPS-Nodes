import methods from "./methods/"
import network from "../network"

class Logger {
  constructor() { }
  login(mac: string) {
    console.log(
      `Device [\x1b[32m${mac}\x1b[0m] logged in ` +
      `with ip  [\x1b[32m${network.getDevice(mac)?.ip || 'X.X.X.X'}\x1b[0m]`
    );
  }
  static getDate = methods.getDate;
  error(msg: string) {
    console.error("Error >> " + msg);
  }
  hit(mac: string, data: any) {
    // Log update
    let msg =
      `[\x1b[36m${Logger.getDate()}\x1b[0m]` +
      `[\x1b[32m${mac}\x1b[0m]  `;

    // Add data in message 
    for (let key in data) {
      msg += `${key}: ${data[key]}  `;
    }
    console.log(msg);
  }
}

export default Logger;