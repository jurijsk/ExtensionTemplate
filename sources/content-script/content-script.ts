import {SelectionObj} from '../Selection';


export class CountStarter {

	constructor() {
		console.log('InjectionStarter started.');
		// addEventListener version
		document.addEventListener('selectionchange', () => {
			console.log("sending message with count: ", window.getSelection()?.toString().length);
			
			chrome.runtime.sendMessage({type: "selection", selection: new SelectionObj(window.getSelection())}, function(response: {msg: string}) {
				console.log("response from background:", response.msg);
			});
		});
	}
}
new CountStarter();




