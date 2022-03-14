import { gpsData, dhtData } from '../../types';


// todo: review this, make it non global
let seed: number[] = [];
for (let i = 0; i < 6; i++) {
  seed.push(Math.random())
}

class SampleGenerator {
  constructor() { }
  static toExp(length: number) {
    return length / 110574;
  }
  static noise(progress: number) {
    let noiseValue = 0;
    for (let i = 0; i < 6; i++) {
      noiseValue += Math.sin(0.1 * i * seed[i] + (seed[i] * (i % 2)));
    }
    return noiseValue;
  }
  static temperature(progress: number): dhtData {
    return {
      temperature: SampleGenerator.noise(progress) + 19,
      humidity: SampleGenerator.noise(progress + 1000) + 34
    }
  }
  static circlePath(r: number, progress: number): gpsData {
    let angle = 2 * Math.PI * progress;
    let radius = SampleGenerator.toExp(r);
    return {
      lon: radius * Math.cos(angle),
      lat: radius * Math.sin(angle)
    };
  }
}
export default SampleGenerator;