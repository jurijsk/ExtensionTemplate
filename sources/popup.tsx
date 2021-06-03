import "./popup.scss";
import {App} from './App';

class PopupStater {
	private docReady(fn: Function) {
		if(document.readyState === "complete" || document.readyState === "interactive") {
			setTimeout(fn, 1);
		} else {
			document.addEventListener("DOMContentLoaded", () => {fn()});
		}
	}
	constructor() {
		function render(){
			App();
		}

		console.log('Popup class created.');
		this.docReady(render);
	}


}
new PopupStater();
export {};
