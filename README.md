# ESP32 GPS Nodes

Use one or multiple ESP32 microcontrolers with GPS modules, and have a listening server which records their data.

We highly recommend using the Arduino extention for Vscode by Microsoft, as the default IDE prevents us from scaling the project.

<br/>

### Support

#### Node side support (Arduino C/C++)

- [x] Connect to a specific Wifi

- [x] Send HTTP GET calls to a specific server

- [ ] Handle GPS Module

- [ ] (Hardware) Add ipex wifi antenae allowing for a longer range


#### Server side support (Nodejs, express)

- [x] Record microcontroler data, and label each one uniquely

- [ ] Web REST API 

- [ ] Web app displaying known & connected nodes (Eventually a GPS Map, Data Graphs) 


<br/>

# Source tree

### Microcontroller source in `./esp32` (C/C++)

* `./esp32/`
* * `main.ino` Main Arduino sketch
* * * `http.h` HTTP Call formatting
* * * `network.h` Wifi connect, handle network related tasks


### Listen Server source in `./node` (NodeJS)

* `./node/`
* * `index.js` Listening server entrypoint
* * `src/`
* * * `getIP.js` Fetch local ip from `ipconfig` (TODO: support for `ifconfig`)
* * * `getDate.js` Get a formatted date string
* * `api/`
* * * `api.js` web app frontend JS
* * * `index.html` Soon to be web app

<br/>

# Arduino dependencies

Add additionnal library sources

```
https://dl.espressif.com/dl/package_esp32_index.json
http://arduino.esp8266.com/stable/package_esp8266com_index.json
```

* Select board `ESP32 Dev Module`

* Delete Arduino's `WiFi.h` library as it causes conflicts with the esp32's libraries.

<br/>


# Run the listening server

> Nodejs required, install here: [https://nodejs.org/](https://nodejs.org/en/)

Install dependencies

```
cd node
npm ci
```

Run from project root

```
npm run server
```
