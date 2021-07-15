import {MessageTypes} from '../MessageTypes';
import {RuntimeMessage} from '../RuntimeMessage';
import {SelectionObj} from '../SelectionObj';


export class Starter {

	constructor() {
		

		let dispatchMessage = function dispatchMessage(message: RuntimeMessage
			, sender: chrome.runtime.MessageSender
			, sendResponse: (response?: any) => void) {

			if(message.type == MessageTypes.SayHi) {
				sayHi();
			}
		}
		chrome.runtime.onMessage.addListener(dispatchMessage);

		let sayHi = function sayHi(){
			chrome.runtime.sendMessage(
				{type: MessageTypes.Hello, message: 'hello'}
				, function(response: {msg: string}) {
				console.log("response from background:", response.msg);
			});
		}




		function docReady(fn: Function) {
			if(document.readyState === "complete" || document.readyState === "interactive") {
				setTimeout(fn, 1);
			} else {
				document.addEventListener("DOMContentLoaded", () => {fn()});
			}
		}
		docReady(() => sayHi());
	}
}
new Starter();




