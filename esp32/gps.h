#include <Arduino.h>
#include <TinyGPS++.h>
#include <TinyGPSPlus.h>
#include <SoftwareSerial.h>

// GPS Pins
#define RX_PIN 17
#define TX_PIN 16

#ifndef GPSOUT
#define GPSOUT

struct gpsout
{
  float lat;
  float lon;
  float alt;
};

#endif

#ifndef GPSDEVICE
#define GPSDEVICE

class GPSDevice
{
private:
  bool waitFix(uint16_t waitSecs);
  uint32_t end_fix_time;
  uint32_t end_wait_time;
  TinyGPSPlus device;
  SoftwareSerial serial;

public:
  GPSDevice();
  gpsout getData();
};

#endif
