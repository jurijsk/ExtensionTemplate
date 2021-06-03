/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./sources/popup.scss
// extracted by mini-css-extract-plugin

;// CONCATENATED MODULE: ./sources/App.tsx
const App = () => {
};

;// CONCATENATED MODULE: ./sources/popup.tsx


class PopupStater {
    docReady(fn) {
        if (document.readyState === "complete" || document.readyState === "interactive") {
            setTimeout(fn, 1);
        }
        else {
            document.addEventListener("DOMContentLoaded", () => { fn(); });
        }
    }
    constructor() {
        function render() {
            App();
        }
        console.log('Popup class created.');
        this.docReady(render);
    }
}
new PopupStater();

/******/ })()
;