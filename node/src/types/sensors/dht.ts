export type dhtData = {
  humidity: number;
  temperature: number;
}

export class DHT {
  dht?: dhtData = undefined;
  setDht(humidity: number, temperature: number): void {
    this.dht = { humidity, temperature }
  };
  getDht(): dhtData | void {
    return this.dht;
  };
}