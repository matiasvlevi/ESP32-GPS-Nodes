"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var getIpFromRequest_1 = __importDefault(require("./methods/getIpFromRequest"));
var getParentPath_1 = __importDefault(require("./methods/getParentPath"));
var logger_1 = __importDefault(require("./logger/"));
var network_1 = __importDefault(require("./network/"));
var types_1 = require("./types/");
var server = (0, express_1.default)();
// Current way of recieving from the ESP32
server.get('/hit', function (req) {
    var nodeIp = (0, getIpFromRequest_1.default)(req);
    // Get device with the same IP
    var device = network_1.default.findByIP(nodeIp);
    if (device === undefined)
        return;
    // Inject GPS coordinates
    device.setPos("" + req.query['lon'], "" + req.query['lat']);
    // Write the device list
    network_1.default.update(device);
    network_1.default.save();
    // Log update
    logger_1.default.hit(device.ip, req.query);
});
server.get('/register', function (req) {
    var macAdress = "" + req.query.id;
    var nodeIp = (0, getIpFromRequest_1.default)(req);
    network_1.default.load();
    var microcontroller = new types_1.Device(macAdress, nodeIp);
    logger_1.default.login(macAdress);
    network_1.default.update(microcontroller);
    network_1.default.save();
});
console.log((0, getParentPath_1.default)(2));
server.use(express_1.default.static((0, getParentPath_1.default)(2) + '/api'));
// Server listen
server.listen(network_1.default.PORT, function () {
    console.log("Listener at http://127.0.0.1:" + network_1.default.PORT);
});
