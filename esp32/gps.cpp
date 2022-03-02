#include "gps.h"

GPSDevice::GPSDevice()
{
  TinyGPSPlus device;
  uint8_t fail = 0;
};

void GPSDevice::init()
{
  Serial.println("Start");
};

void GPSDevice::begin(SoftwareSerial &serial, long baud_rate)
{
  serial.begin(baud_rate);
}
bool GPSDevice::waitFix(SoftwareSerial &serial)
{

  // waits a specified number of seconds for a fix, returns true for good fix
  do
  {
    fail++;
    if (serial.available())
    {
      device.encode(serial.read());
    }
  } while (serial.available() && fail < 255);
  bool isConnected = (device.location.isUpdated() &&
                      device.altitude.isUpdated() &&
                      device.date.isUpdated());
  fail = 0;
  return isConnected;
}

gpsout GPSDevice::getData(SoftwareSerial &serial)
{
  if (waitFix(serial))
  {
    return {
        device.location.lat(),
        device.location.lng(),
        device.altitude.meters()};
  }
  else
  {
    ESP.restart();
    return {.0f, .0f, .0f};
  }
};