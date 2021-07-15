import {MessageTypes} from '../MessageTypes';
import {RuntimeMessage} from '../RuntimeMessage';
import {SelectionObj} from '../SelectionObj';


export class CountStarter {

	constructor() {
		document.addEventListener('selectionchange', () => {
			//console.log("sending message with count: ", window.getSelection()?.toString().length);
			sendSelection();
		});

		let dispatchMessage = function dispatchMessage(message: RuntimeMessage
			, sender: chrome.runtime.MessageSender
			, sendResponse: (response?: any) => void) {

			if(message.type == MessageTypes.SendSelection) {
				sendSelection();
			}
		}
		chrome.runtime.onMessage.addListener(dispatchMessage);

		let sendSelection = function sendSelection(){
			let selection = window.getSelection();

			chrome.runtime.sendMessage(
				{type: MessageTypes.Selection, selection: new SelectionObj(selection)}
				, function(response: {msg: string}) {
				//console.log("response from background:", response.msg);
			});
		}

		function docReady(fn: Function) {
			if(document.readyState === "complete" || document.readyState === "interactive") {
				setTimeout(fn, 1);
			} else {
				document.addEventListener("DOMContentLoaded", () => {fn()});
			}
		}
		docReady(sendSelection);

		// document.oninput = function(event: Event){
		// 	let target = event.target;
		// 	if(target instanceof HTMLElement && target.contentEditable){
		// 		chrome.runtime.sendMessage(
		// 			{type: MessageTypes.Selection, selection: {text: target.innerText}});
		// 	}
		// }
		// document.onfocus = function(event: Event) {
		// 	console.log("focus: ", event);
		// }

	}
}
new CountStarter();




