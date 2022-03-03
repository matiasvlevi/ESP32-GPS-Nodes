
# Environement configs:

### Node `.env`: 

```
PORT=3000
API_PATH="./node/api/data.json"
```

<br/>

### Arduino `uenv.h` :

```cpp
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
  const char SSID[] = "YOUR_NETWORK_SSID";
  const char PASS[] = "YOUR_NETWORK_PASSWORD";
  // Your Listener server IP:
  IPAddress SERVER(0, 0, 0, 0);
  // Listener server Port
  const int PORT = 3000;
}

#endif
```