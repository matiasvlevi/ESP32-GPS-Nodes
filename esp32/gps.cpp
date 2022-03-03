#include "gps.h"

GPSDevice::GPSDevice()
{
  TinyGPSPlus device;
};

gpsLocation GPSDevice::getLocation(SoftwareSerial &serial)
{
  while (!(device.location.isUpdated()))
  {
    if (serial.available() > 0)
    {
      device.encode(serial.read());
    }
  };

  if (device.location.isUpdated())
  {
    return {device.location.lat(), device.location.lng()};
  };
  return {0.0, 0.0};
};