
#include "TinyGPS++.h"

#include <SoftwareSerial.h>

#ifndef GPSENV
#define GPSENV
namespace gpsenv
{
  uint8_t RX_PIN = 16;
  uint8_t TX_PIN = 17;
}
#endif

#ifndef GPSOUT
#define GPSOUT

struct gpsout
{
  double lat;
  double lon;
  double alt;
};

#endif

#ifndef GPSDEVICE
#define GPSDEVICE

class GPSDevice
{
private:
  bool waitFix(SoftwareSerial &serial);
  TinyGPSPlus device;
  uint8_t fail;

public:
  GPSDevice();
  void init();
  void begin(SoftwareSerial &serial, long baud_rate);
  gpsout getData(SoftwareSerial &serial);
};

#endif
