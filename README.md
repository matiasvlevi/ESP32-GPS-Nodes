# ESP32 GPS Nodes

Use one or multiple ESP32 microcontrolers with GPS modules, and have a listening server which records their data.

### Support

#### Node side (Arduino C/C++)

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
