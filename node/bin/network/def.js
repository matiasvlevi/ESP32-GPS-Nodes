"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var types_1 = require("../types/");
var dotenv_1 = require("dotenv");
var replaceAll_1 = __importDefault(require("../methods/replaceAll"));
var logger_1 = __importDefault(require("../logger"));
var config = (0, dotenv_1.config)({ path: './node/.env' }).parsed;
var Network = /** @class */ (function () {
    function Network() {
        this.PORT = config.PORT;
        this.devices = {};
    }
    Network.prototype.update = function (device) {
        this.devices[(0, replaceAll_1.default)(device.mac, ':')] = new types_1.Device(device.mac, device.ip);
    };
    Network.prototype.load = function (path) {
        if (path === void 0) { path = config.API_PATH; }
        if ((0, fs_1.existsSync)(path)) {
            var data = JSON.parse((0, fs_1.readFileSync)(path, 'utf-8'));
            for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                var d = data_1[_i];
                console.log(data[d]);
                this.update(data[d]);
            }
        }
        else {
            logger_1.default.error("API JSON file does not exist");
        }
    };
    Network.prototype.save = function () {
        (0, fs_1.writeFileSync)(config.API_PATH, JSON.stringify(this.devices), 'utf-8');
    };
    Network.prototype.findByIP = function (value) {
        var ans = Object.values(this.devices).filter(function (x) {
            return x.ip.includes(value);
        });
        if (ans.length === 0)
            return;
        return ans[0];
    };
    return Network;
}());
exports.default = Network;
