/**
 * @interface WiFi
 * 
 * @property {string} IP_ADDR ip adress
 * 
 * Wifi related device properties
 */
export interface WiFi {
  IP_ADDR: string;
}

/**
 * @interface Bluethoot
 * 
 * @property {string} bluethoot adress
 * 
 * Bluethoot related device properties
 */
export interface Bluethoot {
  BD_ADDR: string;
}

/**
 * @interface Microcontroller
 * @extends Wifi Since all of our devices hitting this server are fitted with WiFi in some way.
 * 
 * @property {string} type device type, same name as the class which inherits this interface
 * @property {sting} mac device mac adress
 * @property {string} lastUpdated time stamp on last update to the server
 * 
 * The core type of our devices
 */
export interface Microcontroller extends WiFi {
  type: string;
  MAC_ADDR: string;
  lastUpdated: string;
}