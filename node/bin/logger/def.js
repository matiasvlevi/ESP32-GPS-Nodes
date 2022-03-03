"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var getDate_1 = __importDefault(require("../methods/getDate"));
var Logger = /** @class */ (function () {
    function Logger() {
    }
    Logger.prototype.login = function (macAdress) {
        console.log("Microcontroller logged in [\u001B[32m" + macAdress + "\u001B[0m]");
    };
    Logger.prototype.error = function (msg) {
        console.error("Error >> " + msg);
    };
    Logger.prototype.hit = function (deviceIp, data) {
        // Log update
        var msg = "[\u001B[36m" + (0, getDate_1.default)() + "\u001B[0m]" +
            ("[\u001B[32m" + deviceIp + "\u001B[0m]  ");
        // Add data in message 
        for (var key in data) {
            msg += key + ": " + data[key] + "  ";
        }
        console.log(msg);
    };
    return Logger;
}());
exports.default = Logger;
