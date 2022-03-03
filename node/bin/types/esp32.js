"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Device = void 0;
var Device = /** @class */ (function () {
    function Device(mac, ip) {
        this.type = 'ESP32';
        this.ip = ip;
        this.mac = mac;
        this.gps = undefined;
        this.lastUpdated = new Date().toString();
    }
    Device.prototype.setPos = function (lon, lat) {
        this.gps = { lon: lon, lat: lat };
    };
    return Device;
}());
exports.Device = Device;
