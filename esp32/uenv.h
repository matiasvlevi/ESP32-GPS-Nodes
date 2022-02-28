#pragma once

#define UPDATE_DELAY 1000
#define BAUD_RATE 115200

#ifndef ENV_h
#define ENV_h

namespace env
{
  // Network
  const char SSID[] = "YOUR_NETWORK_NAME";
  const char PASS[] = "YOUR_NETWORK_PASSWORD";
  // Your Listener server IP:
  IPAddress SERVER(192, 168, 31, 213);
  // Listener server Port
  const int PORT = 1880;
}

#endif