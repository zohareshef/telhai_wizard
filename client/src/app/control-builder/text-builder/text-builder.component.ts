import { Component, Input, OnInit } from '@angular/core';
import { INPUT_TYPES } from '../../wizard/wizard.constants';
import { TextPayload, Control } from '../../wizard/wizard.types';

@Component({
	selector: 'app-text-builder',
	templateUrl: './text-builder.component.html',
	styleUrls: ['../control-builder.component.scss'],
})
export class TextBuilderComponent {
	@Input()
	control: Control;

	readonly INPUT_TYPES = INPUT_TYPES;

	get payload() {
		return this.control?.payload as TextPayload;
	}
}
