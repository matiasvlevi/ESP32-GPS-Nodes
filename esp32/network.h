#pragma once

#include <Arduino.h>
#include "WiFi.h"

#ifndef NETWORK
#define NETWORK

namespace network
{
  String connect(const char ssid[], const char pass[], int signalPin);
  String IpToString(const IPAddress &ipAddress);
  String getMacAdress(void);
}
#endif