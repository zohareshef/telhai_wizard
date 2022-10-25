import { Component, Input } from '@angular/core';
import { ParagraphPayload, Control } from '../../wizard/wizard.types';

@Component({
	selector: 'app-paragraph-builder',
	templateUrl: './paragraph-builder.component.html',
	styleUrls: ['../control-builder.component.scss'],
})
export class ParagraphBuilderComponent {
	@Input()
	control: Control;

	get payload() {
		return this.control.payload as ParagraphPayload;
	}
}
