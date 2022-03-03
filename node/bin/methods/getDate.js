"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @method getDate
 * Get the current date as a formatted string
 *
 * @return Date formatted in a string
 */
var getDate = function () {
    var a = new Date();
    var hour = a.getHours();
    var min = a.getMinutes();
    // Add `0` if number doesnt use 2 digits
    if (hour < 10)
        hour = "0" + hour;
    if (min < 10)
        min = "0" + min;
    return hour + ":" + min;
};
exports.default = getDate;
