import { Component, ViewChild } from '@angular/core';
import { BaseControlComponent } from '../base-control.component';
import { SecuredPayload } from '../../wizard/wizard.types';
import { MatInput } from '@angular/material/input';

@Component({
	selector: 'app-secured-control',
	templateUrl: './secured-control.component.html',
	styleUrls: ['../shared-styles.scss'],
})
export class SecuredControlComponent extends BaseControlComponent<SecuredPayload> {
	@ViewChild(MatInput)
	input: MatInput;
	toggleInputType() {
		if (this.input.type == 'password') {
			this.input.type = 'text';
		} else {
			this.input.type = 'password';
		}
	}
}
