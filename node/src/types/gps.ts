export type gpsData = {
  lon: string;
  lat: string;
}

export interface GPS {
  gps?: gpsData;
  setGps(lon: string, lat: string): void;
}
