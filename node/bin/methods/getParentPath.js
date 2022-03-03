"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getParentPath(n) {
    var path = __dirname.split('\\');
    for (var i = 0; i < n; i++) {
        path.pop();
    }
    return path.join('\\');
}
exports.default = getParentPath;
