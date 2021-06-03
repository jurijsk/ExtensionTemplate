/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
console.log("coming at you from background..");
chrome.runtime.onStartup.addListener(function () {
    console.log("coming at you from background:onStartup");
    chrome.browserAction.setBadgeBackgroundColor({ color: "#A9FFAD" });
    chrome.browserAction.setBadgeText({ text: "   0" });
});
chrome.runtime.onConnect.addListener(function (port) {
    console.log('[background]', arguments);
});
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    //chrome.browserAction.setTitle({title: "Selects some text count chracters"});
    console.log(sender.tab ?
        "from a content script:" + sender.tab.url :
        "from the extension");
    if (message.type == "selection") {
        let selection = message.selection;
        let text = '9999+';
        let color = '#BC89EC';
        let len = selection.text.length;
        if (len == 0) {
            text = '';
        }
        else if (len <= 999) {
            if (len >= 260 && len < 280) {
                color = '#FF6500';
            }
            else if (len == 280) {
                color = '#FF0000';
            }
            text = '' + len;
        }
        chrome.browserAction.setBadgeText({ text: text });
        chrome.browserAction.setBadgeBackgroundColor({ color: color });
        chrome.browserAction.setTitle({ title: `Count: ${len} characters selected.` });
        sendResponse({ msg: 'badge text: ' + text });
    }
});


/******/ })()
;