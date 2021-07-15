/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

// UNUSED EXPORTS: Starter

;// CONCATENATED MODULE: ./sources/MessageTypes.ts
var MessageTypes;
(function (MessageTypes) {
    MessageTypes["Hello"] = "Hello";
    MessageTypes["SayHi"] = "SayHi";
})(MessageTypes || (MessageTypes = {}));

;// CONCATENATED MODULE: ./sources/content-script/content-script.ts

class Starter {
    constructor() {
        let dispatchMessage = function dispatchMessage(message, sender, sendResponse) {
            if (message.type == MessageTypes.SayHi) {
                sayHi();
            }
        };
        chrome.runtime.onMessage.addListener(dispatchMessage);
        let sayHi = function sayHi() {
            chrome.runtime.sendMessage({ type: MessageTypes.Hello, message: 'hello' }, function (response) {
                console.log("response from background:", response.msg);
            });
        };
        function docReady(fn) {
            if (document.readyState === "complete" || document.readyState === "interactive") {
                setTimeout(fn, 1);
            }
            else {
                document.addEventListener("DOMContentLoaded", () => { fn(); });
            }
        }
        docReady(() => sayHi());
    }
}
new Starter();

/******/ })()
;