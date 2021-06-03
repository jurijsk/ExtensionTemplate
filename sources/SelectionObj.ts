export class SelectionObj {
	public text: string = "";
	constructor(selection: Selection | null){
		if(!selection) {
			return;
		}
		this.text = selection.toString();
	} 
}