#pragma once

// Microcontroller settings
#define UPDATE_DELAY 1000
#define BAUD_RATE 115200

#ifndef ENV_h
#define ENV_h

// Network settings
namespace env
{
  // TODO: Add in separate files
  //  Network
  const char SSID[] = "YOUR_NETWORK_NAME";
  const char PASS[] = "YOUR_NETWORK_PASSWORD";
  // Your Listener server IP:
  IPAddress SERVER(192, 168, 67, 213);
  // Listener server Port
  const int PORT = 1880;
}

#endif