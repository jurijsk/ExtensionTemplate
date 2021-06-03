/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

// UNUSED EXPORTS: CountStarter

;// CONCATENATED MODULE: ./sources/Selection.ts
class SelectionObj {
    constructor(selection) {
        this.text = "";
        if (!selection) {
            return;
        }
        this.text = selection.toString();
    }
}

;// CONCATENATED MODULE: ./sources/content-script/content-script.ts

class CountStarter {
    constructor() {
        console.log('InjectionStarter started.');
        // addEventListener version
        document.addEventListener('selectionchange', () => {
            var _a;
            console.log("sending message with count: ", (_a = window.getSelection()) === null || _a === void 0 ? void 0 : _a.toString().length);
            chrome.runtime.sendMessage({ type: "selection", selection: new SelectionObj(window.getSelection()) }, function (response) {
                console.log("response from background:", response.msg);
            });
        });
    }
}
new CountStarter();

/******/ })()
;