"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var getData = function (path) {
    var data;
    if ((0, fs_1.existsSync)(path))
        data = JSON.parse((0, fs_1.readFileSync)(path, 'utf-8'));
    else
        data = {};
    return data;
};
exports.default = getData;
