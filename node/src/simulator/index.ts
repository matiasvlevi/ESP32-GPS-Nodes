import { EnviroPack } from '../types/enviropack';

import Simulation from './src/Simulation';

new Simulation(EnviroPack, {
  devices: 5,
  iterations: 16,
  delay: 2000,
  home: [45.532286, -73.589860]
}).start();
