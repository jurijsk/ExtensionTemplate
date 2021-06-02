/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
console.log("coming at you from background.");
chrome.runtime.onStartup.addListener(function () {
    console.log("coming at you from background:onStartup");
});
chrome.runtime.onConnect.addListener(function (port) {
    chrome.tabs.insertCSS({ file: chrome.runtime.getURL('styles/style.css') }, (results) => {
        console.log(results);
    });
});


/******/ })()
;