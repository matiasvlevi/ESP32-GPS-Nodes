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
  const char SSID[] = "RCMP Security";
  const char PASS[] = "wazzaa123";
  // Your Listener server IP:
  IPAddress SERVER(192, 168, 117, 213);
  // Listener server Port
  const int PORT = 3000;
}

#endif