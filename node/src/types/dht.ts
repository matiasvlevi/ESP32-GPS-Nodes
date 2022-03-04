export type dhtData = {
  humidity: string;
  temperature: string;
}

export interface DHT {
  dht?: dhtData;
  setDht(humidity: string, temperature: string): void;
}