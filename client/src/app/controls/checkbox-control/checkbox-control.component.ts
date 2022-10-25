import { Component } from '@angular/core';
import { CheckBoxPayload } from 'src/app/wizard/wizard.types';
import { BaseControlComponent } from '../base-control.component';

@Component({
	selector: 'app-checkbox-control',
	templateUrl: './checkbox-control.component.html',
	styleUrls: ['../shared-styles.scss'],
})
export class CheckboxControlComponent extends BaseControlComponent<CheckBoxPayload> {
	onClick(event: MouseEvent) {
		if (this.answered) {
			event.preventDefault();
			return;
		}
	}

	onCheck(index: number) {
		this._formControl.value[index] = !this._formControl.value[index];
	}
}
