import Simulation from './Simulation'
import {
  Multi,
  DeviceConstructor,
  gpsData,
  dhtData
} from '../../types'
import { exec } from '../utils'

class Simulated<T extends Multi> {
  device: T;
  simulation: Simulation<T>;
  lastUpdate: number;
  lon: number;
  lat: number;
  updatedTimes: number;
  constructor(
    deviceConstructor: DeviceConstructor<T>,
    index: number = 0,
    simulation: Simulation<T>
  ) {
    this.lon = Simulation.random(
      simulation.config.home[1] - 0.001,
      simulation.config.home[1] + 0.001
    );
    this.lat = Simulation.random(
      simulation.config.home[0] - 0.001,
      simulation.config.home[0] + 0.001
    );
    this.device = new deviceConstructor(`Simulated_`, `X.X.X.X`);
    this.device.MAC_ADDR = `Simulated_${this.device.type}_${index}`;
    this.lastUpdate = new Date().getTime();
    this.simulation = simulation;

    this.updatedTimes = 0;
  }
  async hit() {
    let req: string[] = [];
    if ('gps' in this.device) {
      let sample: gpsData =
        this.simulation.sample.circlePath(5, this.updatedTimes / this.simulation.iterations);

      // Set virtual client local data 
      this.device.setGps(
        sample.lon + this.lon,
        sample.lat + this.lat
      );
      await Simulation.delay(1000, 1200); // Request delay

      // Append data to simulated request
      req.push(`lon=${this.device.gps?.lon}`);
      req.push(`lat=${this.device.gps?.lat}`);
    }
    if ('dht' in this.device) {
      // Generate sample data
      let sample: dhtData =
        this.simulation.sample.temperature(this.updatedTimes / this.simulation.iterations);

      // Set virtual client local data 
      this.device.setDht(
        sample.temperature,
        sample.humidity
      );

      await Simulation.delay(1000, 1200); // Request delay

      // Append data to simulated request
      req.push(`temperature=${this.device.dht?.temperature}`);
      req.push(`humidity=${this.device.dht?.humidity}`);
    }
    req.push(`id=${this.device.MAC_ADDR}`);
    const call: string = `${Simulation.URL}/hit?${req.join('&')}`;
    const { stdout } = await exec(`curl "${call}"`);
    // change to use the stdout.err
    if (JSON.parse(stdout).status !== 'OK') return;

    this.updatedTimes++;

    console.log(`Updated device ${this.device.MAC_ADDR}`);
  }
  async register() {
    const { stdout } = await exec(
      `curl "${Simulation.URL}/register?id=${this.device.MAC_ADDR}"`
    );

    if (JSON.parse(stdout).status !== 'OK') return;
    console.log(`Registered device ${this.device.MAC_ADDR}`);
  }
}

export default Simulated;