import { Component, Input } from '@angular/core';
import { SecuredPayload, Control } from '../../wizard/wizard.types';

@Component({
	selector: 'app-secured-builder',
	templateUrl: './secured-builder.component.html',
	styleUrls: ['../control-builder.component.scss'],
})
export class SecuredBuilderComponent {
	@Input()
	control: Control;

	get payload() {
		return this.control.payload as SecuredPayload;
	}
}
