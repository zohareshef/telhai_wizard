import { Component, Input } from '@angular/core';
import { LabelPayload, Control } from '../../wizard/wizard.types';

@Component({
	selector: 'app-label-builder',
	templateUrl: './label-builder.component.html',
	styleUrls: ['../control-builder.component.scss'],
})
export class LabelBuilderComponent {
	@Input()
	control: Control;

	get payload() {
		return this.control.payload as LabelPayload;
	}
}
