/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./sources/injection/injection.scss
// extracted by mini-css-extract-plugin

;// CONCATENATED MODULE: ./sources/injection/content-script.ts

console.log("injection starts..");
class Logger {
    constructor() {
    }
    log(message, ...optionalParams) {
    }
}
const logger = new Logger();
class InjectionStarter {
    constructor() {
        chrome.runtime.connect({ name: "do-stuff" });
        this.injectOpener();
        //this.createIntersectionObserver();
        //this.startMakingRoom();
        //this.createMutationObserver();
        console.log("injection loaded and started");
    }
    injectOpener() {
        //var imgURL = chrome.runtime.getURL("/images/floating-tin.png");
        const opener = document.createElement("div");
        opener.id = 'copycan-opener';
        //opener.setAttribute('src', imgURL);
        opener.className = 'copycan-opener';
        //opener.alt = 'Copycan opener button';
        document.body.append(opener);
    }
    ;
    createInjectionContainer() {
        const injectionContainer = document.createElement("div");
        injectionContainer.className = "copycan-injection-panel";
        injectionContainer.setAttribute("aria-hidden", "true");
        injectionContainer.innerHTML = 'here it is. the injection.';
        return injectionContainer;
    }
    start() {
        const injectionContainer = this.createInjectionContainer();
        const body = document.body;
        body.append(injectionContainer);
    }
    ;
}
new InjectionStarter();

/******/ })()
;