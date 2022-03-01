"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var getIP_1 = __importDefault(require("./methods/getIP"));
var getDate_1 = __importDefault(require("./methods/getDate"));
var dotenv_1 = require("dotenv");
var config = (0, dotenv_1.config)({ path: './node/.env' }).parsed;
var port = config.PORT;
var express_1 = __importDefault(require("express"));
var server = (0, express_1.default)();
var api_data_path = './node/api/data.json';
var getData = function (path) {
    var data;
    if ((0, fs_1.existsSync)(path))
        data = JSON.parse((0, fs_1.readFileSync)(path, 'utf-8'));
    else
        data = {};
    return data;
};
function getIPFromRequest(req) {
    var ip = (req.header('x-forwarded-for') || req.connection.remoteAddress).split(':');
    ip = ip[ip.length - 1];
    return ip;
}
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var ip;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, getIP_1.default)()];
            case 1:
                ip = _a.sent();
                // Current way of recieving from the ESP32
                server.get('/hit', function (req, res) {
                    var nodeIp = getIPFromRequest(req);
                    var msg = "[\u001B[36m" + (0, getDate_1.default)() + "\u001B[0m]" +
                        ("[\u001B[32m" + nodeIp + "\u001B[0m]  ");
                    // Add data in message 
                    for (var key in req.query) {
                        msg += key + ": " + req.query[key] + "  ";
                    }
                    console.log(msg);
                });
                server.get('/register', function (req, res) {
                    var macAdress = ("" + req.query.id) || '';
                    while (macAdress.includes(':'))
                        macAdress = macAdress.replace(':', '');
                    var nodeIp = getIPFromRequest(req);
                    var data = getData(api_data_path);
                    var microcontroller = {
                        type: 'ESP32',
                        ip: nodeIp,
                        mac: req.query.id,
                        lastUpdated: new Date().toString()
                    };
                    console.log("ESP32 [" + req.query.id + "]");
                    data[macAdress] = microcontroller;
                    (0, fs_1.writeFileSync)(api_data_path, JSON.stringify(data), 'utf-8');
                });
                server.use(express_1.default.static(__dirname + '/api'));
                // Server listen
                server.listen(1880, function () {
                    console.log("Listener at http://" + ip + ":" + port);
                });
                return [2 /*return*/];
        }
    });
}); })();
