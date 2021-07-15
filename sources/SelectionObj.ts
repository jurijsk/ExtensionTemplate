export class SelectionObj {
	public text: string = "";
	constructor(selection: Selection | null){
		if(!selection) {
			return;
		}
		if(selection.isCollapsed) {
			let activeElement = document.activeElement;
			if(!activeElement){
				console.log("no active element");
			} else if(activeElement instanceof HTMLInputElement){
				this.text = activeElement.value;
				console.log("input element: " + this.text);
			} else if(activeElement instanceof HTMLTextAreaElement) {
				this.text = activeElement.value;
				console.log("text area element: " + this.text);
			} else if(activeElement instanceof HTMLElement && activeElement.contentEditable) {
				//this.text = activeElement.innerText;
				//console.log("content editable: " + this.text);
			} else {
				console.log(activeElement);
			}
		}else{
			console.log(selection);
			this.text = selection.toString();
		}
		
	} 
}