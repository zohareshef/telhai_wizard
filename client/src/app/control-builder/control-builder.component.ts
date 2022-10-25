import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as WizardHelpers from '../wizard/wizard.helpers';
import { Control, ControlType } from '../wizard/wizard.types';

@Component({
	selector: 'app-control-builder',
	templateUrl: './control-builder.component.html',
	styleUrls: ['./control-builder.component.scss'],
})
export class ControlBuilderComponent {
	@Input()
	control: Control;

	@Input()
	moveUpDisabled = false;

	@Input()
	moveDownDisabled = false;

	@Output()
	move = new EventEmitter<'up' | 'down'>();

	@Output()
	remove = new EventEmitter();

	readonly controlTypes: ControlType[] = [
		'label',
		'paragraph',
		'text',
		'secured',
		'checkbox',
		'radio',
		'image',
		'select',
	];

	changeControlType(controlType: ControlType) {
		const { type, payload } = WizardHelpers.createEmptyControl(controlType);
		this.control.type = type;
		this.control.payload = payload;
	}

	controlTypeToIcon(controlType: ControlType) {
		return WizardHelpers.wizardControlToIcon(controlType);
	}
}
