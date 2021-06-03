import {MessageTypes} from '../MessageTypes';
import {RuntimeMessage} from '../RuntimeMessage';
import {SelectionObj} from '../SelectionObj';


console.log("coming at you from background..");
chrome.runtime.onStartup.addListener(function() {
	console.log("coming at you from background:onStartup");
	chrome.browserAction.setBadgeBackgroundColor({color: "#A9FFAD"});
	chrome.browserAction.setBadgeText({ text: "   0"});

})


chrome.runtime.onConnect.addListener(function(port: chrome.runtime.Port){
	console.log('[background]', arguments);
});

let onTabActivated = function onTabActivated(info: chrome.tabs.TabActiveInfo){

	chrome.tabs.sendMessage(info.tabId, {type: MessageTypes.SendSelection});
	
}


chrome.tabs.onActivated.addListener(onTabActivated);


let dispatchMessage = function dispatchMessage(message: RuntimeMessage
	, sender: chrome.runtime.MessageSender
	, sendResponse: (response?: any) => void){

	console.log(sender.tab ?
		"from a content script:" + sender.tab.url :
		"from the extension");

	if(message.type == MessageTypes.Selection) {
		let response = updateBadge(message.selection as SelectionObj);
		sendResponse(response);
	}
}
chrome.runtime.onMessage.addListener(dispatchMessage);


let updateBadge = function updateBadge(selection: SelectionObj){
	let text = '9999+';
	let color = '#BC89EC';
	let len = selection.text.length;
	if(len == 0) {
		text = '';
	} else if(len <= 999) {
		if(len >= 240 && len < 280) {
			color = '#FF6500';
		} else if(len == 280) {
			color = '#FF0000';
		}
		text = '' + len;
	}

	chrome.browserAction.setBadgeText({text: text});
	chrome.browserAction.setBadgeBackgroundColor({color: color});
	chrome.browserAction.setTitle({title: `Count: ${len} characters selected.`});
	return {msg: 'badge text: ' + text}
}


export {}