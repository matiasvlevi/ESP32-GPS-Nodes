"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getIPFromRequest(req) {
    var ip = req.headers['cf-connecting-ip'] || req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    ip = ip[ip.length - 1];
    return ip;
}
exports.default = getIPFromRequest;
