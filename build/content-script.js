/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

// UNUSED EXPORTS: CountStarter

;// CONCATENATED MODULE: ./sources/MessageTypes.ts
var MessageTypes;
(function (MessageTypes) {
    MessageTypes["SendSelection"] = "SEND_SELECTION";
    MessageTypes["Selection"] = "SELECTION";
    MessageTypes["TabBlur"] = "TAB_BLUR";
})(MessageTypes || (MessageTypes = {}));

;// CONCATENATED MODULE: ./sources/SelectionObj.ts
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
        document.addEventListener('selectionchange', () => {
            var _a;
            console.log("sending message with count: ", (_a = window.getSelection()) === null || _a === void 0 ? void 0 : _a.toString().length);
            sendSelection();
        });
        let dispatchMessage = function dispatchMessage(message, sender, sendResponse) {
            if (message.type == MessageTypes.SendSelection) {
                sendSelection();
            }
        };
        chrome.runtime.onMessage.addListener(dispatchMessage);
        let sendSelection = function sendSelection() {
            chrome.runtime.sendMessage({ type: MessageTypes.Selection, selection: new SelectionObj(window.getSelection()) }, function (response) {
                console.log("response from background:", response.msg);
            });
        };
        window.addEventListener("blur", function () {
            console.log("window.blur");
            chrome.runtime.sendMessage({ type: MessageTypes.TabBlur });
        });
    }
}
new CountStarter();

/******/ })()
;