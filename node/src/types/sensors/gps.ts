export type gpsData = {
  lon: number;
  lat: number;
}

export class GPS {
  gps?: gpsData = undefined;
  setGps(lon: number, lat: number): void {
    this.gps = { lon, lat }
  };
  getGps(): gpsData | void {
    return this.gps;
  };
}