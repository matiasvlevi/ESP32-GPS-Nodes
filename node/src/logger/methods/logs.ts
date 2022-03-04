import network from '../../network';
import Logger from '../def'

export function login(mac: string): void {
  console.log(
    `Device [\x1b[32m${mac}\x1b[0m] logged in ` +
    `with ip  [\x1b[32m${network.getDevice(mac)?.ip || 'X.X.X.X'}\x1b[0m]`
  );
}

export function error(msg: string): void {
  console.error("Error >> " + msg);
}

export function hit(mac: string, data: any): void {
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