"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function replaceAll(content, ch) {
    var str = content;
    while (str.includes(ch))
        str = str.replace(ch, '');
    return str;
}
exports.default = replaceAll;
