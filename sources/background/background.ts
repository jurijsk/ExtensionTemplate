import {MessageTypes} from '../MessageTypes';



chrome.runtime.onStartup.addListener(function() {
	console.log("coming at you from background:onStartup");
	chrome.browserAction.setBadgeBackgroundColor({color: "#A9FFAD"});
	chrome.browserAction.setBadgeText({ text: "   0"});
});

chrome.tabs.onUpdated.addListener(function() {
	console.log(arguments)
});


chrome.runtime.onConnect.addListener(function(port: chrome.runtime.Port){
	console.log('[background]', arguments);
});

let onTabActivated = function onTabActivated(info: chrome.tabs.TabActiveInfo){
	chrome.tabs.sendMessage(info.tabId, {type: MessageTypes.SayHi});
}


chrome.tabs.onActivated.addListener(onTabActivated);


let dispatchMessage = function dispatchMessage(message: any
	, sender: chrome.runtime.MessageSender
	, sendResponse: (response?: any) => void){
}
chrome.runtime.onMessage.addListener(dispatchMessage);


export {}