import getDate from "../methods/getDate";

class Logger {
  constructor() { }
  login(macAdress: string) {
    console.log(`Microcontroller logged in [\x1b[32m${macAdress}\x1b[0m]`);
  }
  error(msg: string) {
    console.error("Error >> " + msg);
  }
  hit(deviceIp: string, data: any) {
    // Log update
    let msg =
      `[\x1b[36m${getDate()}\x1b[0m]` +
      `[\x1b[32m${deviceIp}\x1b[0m]  `;

    // Add data in message 
    for (let key in data) {
      msg += `${key}: ${data[key]}  `;
    }
    console.log(msg);
  }
}

export default Logger;