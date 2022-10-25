import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BaseControlComponent } from '../base-control.component';
import { Control, TextPayload } from '../../wizard/wizard.types';

@Component({
	selector: 'app-text-control',
	templateUrl: './text-control.component.html',
	styleUrls: ['../shared-styles.scss'],
})
export class TextControlComponent extends BaseControlComponent<TextPayload> {
	get inputType() {
		const { inputType } = this.payload;
		if (inputType == 'number' || inputType == 'range') {
			return 'number';
		}
		return 'text';
	}
}
