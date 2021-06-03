import {SelectionObj} from './SelectionObj';

export interface RuntimeMessage {
	type: string;
	selection?: SelectionObj
}