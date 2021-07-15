/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./sources/MessageTypes.ts
var MessageTypes;
(function (MessageTypes) {
    MessageTypes["Hello"] = "Hello";
    MessageTypes["SayHi"] = "SayHi";
})(MessageTypes || (MessageTypes = {}));

;// CONCATENATED MODULE: ./sources/background/background.ts

chrome.runtime.onStartup.addListener(function () {
    console.log("coming at you from background:onStartup");
    chrome.browserAction.setBadgeBackgroundColor({ color: "#A9FFAD" });
    chrome.browserAction.setBadgeText({ text: "   0" });
});
chrome.tabs.onUpdated.addListener(function () {
    console.log(arguments);
});
chrome.runtime.onConnect.addListener(function (port) {
    console.log('[background]', arguments);
});
let onTabActivated = function onTabActivated(info) {
    chrome.tabs.sendMessage(info.tabId, { type: MessageTypes.SayHi });
};
chrome.tabs.onActivated.addListener(onTabActivated);
let dispatchMessage = function dispatchMessage(message, sender, sendResponse) {
};
chrome.runtime.onMessage.addListener(dispatchMessage);

/******/ })()
;