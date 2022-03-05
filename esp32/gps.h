
#include "TinyGPS++.h"

#include <SoftwareSerial.h>

#ifndef GPSENV
#define GPSENV
namespace gpsenv
{
  uint8_t GPS_TX_PIN = 16;
  uint8_t GPS_RX_PIN = 17;
}
#endif

#ifndef GPSOUT
#define GPSOUT

struct gpsLocation
{
  double lat;
  double lon;
  bool updated;
};

#endif

#ifndef GPSDEVICE
#define GPSDEVICE

class GPSDevice
{
private:
  TinyGPSPlus device;

public:
  GPSDevice();
  gpsLocation getLocation(SoftwareSerial &serial);
};

#endif
