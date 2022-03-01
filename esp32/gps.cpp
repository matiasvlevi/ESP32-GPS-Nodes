#include "gps.h"

GPSDevice::GPSDevice()
{
  TinyGPSPlus device;
  SoftwareSerial serial(RX_PIN, TX_PIN);
  end_wait_time = 0;
  end_fix_time = 0;
};

bool GPSDevice::waitFix(uint16_t waitSecs)
{
  // waits a specified number of seconds for a fix, returns true for good fix

  uint8_t GPSchar;

  end_wait_time = millis() + (waitSecs * 1000);

  while (millis() < end_wait_time)
  {
    if (serial.available() > 0)
    {
      GPSchar = serial.read();
      device.encode(GPSchar);
    }

    if (
        device.location.isUpdated() &&
        device.altitude.isUpdated() &&
        device.date.isUpdated())
    {
      end_fix_time = millis();
      return true;
    }
  }
  return false;
}

gpsout GPSDevice::getData()
{
  if (waitFix(5))
  {
    return {
        device.location.lat(),
        device.location.lng(),
        device.altitude.meters()};
  }
  else
  {
    return {.0f, .0f, .0f};
  }
};