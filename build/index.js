#! /usr/bin/env node
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var inquirer_1 = require("inquirer");
var clipboardy_1 = require("clipboardy");
var url = new URL('https://calendar.google.com/calendar/render');
var getTodaysDate = function () {
    var dt = new Date();
    var year = dt.getFullYear();
    var month = dt.getMonth();
    var date = dt.getDate();
    return year + "-" + (month + 1) + "-" + date;
};
inquirer_1.prompt([
    {
        type: 'input',
        name: 'text',
        message: 'Enter the title of the event',
        default: 'EDC assignment-1',
    },
    {
        type: 'input',
        name: 'dates',
        message: 'Enter the date [YYYY-MM-DD]',
        default: getTodaysDate(),
    },
]).then(function (calInfo) {
    var urlInfo = __assign({ action: "TEMPLATE" }, calInfo);
    var theDate = calInfo.dates;
    var number = Number(theDate.replace(/\-/g, ""));
    var dates = number + "/" + (number + 1);
    url.search = new URLSearchParams(__assign(__assign({}, urlInfo), { dates: dates })).toString().replace("%2F", "/");
    console.log(url.toString());
    clipboardy_1.writeSync(url.toString());
    console.log("URL copied to Clipboard.");
}).catch(function (err) { return console.log(err); });
