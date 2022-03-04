#include "gps.h"

GPSDevice::GPSDevice()
{
  TinyGPSPlus device;
};

gpsLocation GPSDevice::getLocation(SoftwareSerial &serial)
{
  uint8_t fail = 0;
  while (!(device.location.isUpdated()) && fail < 250)
  {
    if (serial.available() > 0)
    {
      device.encode(serial.read());
    }
    fail++;
  };

  if (device.location.isUpdated())
  {
    return {device.location.lat(), device.location.lng()};
  };
  return {0.0, 0.0};
};