import {
  Multi,
  DeviceConstructor
} from '../../types'

import { delay } from '../utils'

import { SimulationConfig } from '../types';
import { SimulationDefault } from '../types/defaults';

import SampleGenerator from './SampleGenerator'

import Simulated from './Simulated'

class Simulation<T extends Multi> {
  iterations: number;
  devices: Simulated<T>[];
  config: SimulationConfig;

  constructor(
    deviceType: DeviceConstructor<T>,
    config: SimulationConfig = SimulationDefault
  ) {
    this.config = config;
    this.iterations = config.iterations || 10;
    this.devices = [];

    for (let i = 0; i < (config.devices || 1); i++) {
      this.devices.push(new Simulated(deviceType, i, this));
    }
  }
  sample = SampleGenerator;

  static URL = `http://127.0.0.1:3000`;

  static random = 
    (rangeEnd: number, rangeStart: number) =>
    Simulation.map(Math.random(), rangeStart, rangeEnd);

  static map = 
    (v: number, c: number, d: number) => (v) * (d - c) + c;

  static delay = 
    async (rangeStart: number, rangeEnd: number) =>
     await delay(Simulation.random(rangeStart, rangeEnd));

  async start() {
    await this.register();
    await this.hit();
  }

  async register() {
    this.devices.forEach(async (virtual) => {
      await virtual.register();
    });
  }

  async hit() {
    for (let i = 0; i < this.iterations; i++) {
      this.devices.forEach(async (virtual) => {
        await virtual.hit();
      });
      await Simulation.delay(this.config.delay, this.config.delay + 2500); // Add noise delay
    }
  }

  log() { console.log(this.devices) }
}

export default Simulation;