import { Component, Input } from '@angular/core';
import { Control, SelectPayload } from '../../wizard/wizard.types';

@Component({
	selector: 'app-select-builder',
	templateUrl: './select-builder.component.html',
	styleUrls: ['../control-builder.component.scss'],
})
export class SelectBuilderComponent {
	@Input()
	control: Control;

	get payload() {
		return this.control.payload as SelectPayload;
	}

	removeOption(index: number) {
		this.payload.options.splice(index, 1);
	}
	addOption() {
		this.payload.options.push({ text: '' });
	}
}
