import { Component, Input } from '@angular/core';
import { RadioBoxPayload, Control } from '../../wizard/wizard.types';

@Component({
	selector: 'app-radio-builder',
	templateUrl: './radio-builder.component.html',
	styleUrls: ['../control-builder.component.scss'],
})
export class RadioBuilderComponent {
	@Input()
	control: Control;

	get payload() {
		return this.control.payload as RadioBoxPayload;
	}

	removeOption(index: number) {
		this.payload.options.splice(index, 1);
	}
	addOption() {
		this.payload.options.push({ text: '' });
	}
}
