import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Control } from 'src/app/wizard/wizard.types';
import { ControlPayload } from '../wizard/wizard.types';

@Component({
	template: '',
})
export abstract class BaseControlComponent<T extends ControlPayload> {
	@Input()
	wizardControl: Control;

	@Input()
	answered = false;

	@Input()
	_formControl: FormControl; // because can't use formControl

	get payload() {
		return this.wizardControl.payload as T;
	}
}
