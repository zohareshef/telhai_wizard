import { Component } from '@angular/core';
import { RadioBoxPayload } from 'src/app/wizard/wizard.types';
import { BaseControlComponent } from '../base-control.component';

@Component({
	selector: 'app-radio-control',
	templateUrl: './radio-control.component.html',
	styleUrls: ['../shared-styles.scss'],
})
export class RadioControlComponent extends BaseControlComponent<RadioBoxPayload> {
	onClick(event: MouseEvent) {
		if (this.answered) {
			event.preventDefault();
			return;
		}
	}
}
