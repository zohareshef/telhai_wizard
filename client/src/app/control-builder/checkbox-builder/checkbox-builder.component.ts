import { Component, Input } from '@angular/core';
import { CheckBoxPayload, Control } from '../../wizard/wizard.types';

@Component({
	selector: 'app-checkbox-builder',
	templateUrl: './checkbox-builder.component.html',
	styleUrls: ['../control-builder.component.scss'],
})
export class CheckboxBuilderComponent {
	@Input()
	control: Control;

	get payload() {
		return this.control.payload as CheckBoxPayload;
	}

	removeOption(index: number) {
		this.payload.options.splice(index, 1);
	}
	addOption() {
		this.payload.options.push({ text: '' });
	}
}
