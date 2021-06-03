import {MessageTypes} from '../MessageTypes';
import {RuntimeMessage} from '../RuntimeMessage';
import {SelectionObj} from '../SelectionObj';


export class CountStarter {

	constructor() {
		document.addEventListener('selectionchange', () => {
			console.log("sending message with count: ", window.getSelection()?.toString().length);
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
			chrome.runtime.sendMessage(
				{type: MessageTypes.Selection, selection: new SelectionObj(window.getSelection())}
				, function(response: {msg: string}) {
				console.log("response from background:", response.msg);
			});
		}

	}
}
new CountStarter();




