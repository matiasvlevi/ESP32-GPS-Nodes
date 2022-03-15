

import Arduino from '../types/devices/arduino';
import EnviroPack from '../types/devices/enviropack';
import ESP32 from '../types/devices/esp32';

import Simulation from './src/Simulation';

new Simulation(ESP32, {
  devices: 512,
  iterations: 32,
  delay: 2000,
  home: [45.532286, -73.589860]
}).start();
