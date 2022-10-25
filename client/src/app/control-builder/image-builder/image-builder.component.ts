import { Component, Input } from '@angular/core';
import {
	ImagePayload,
	SecuredPayload,
	Control,
} from '../../wizard/wizard.types';

@Component({
	selector: 'app-image-builder',
	templateUrl: './image-builder.component.html',
	styleUrls: ['../control-builder.component.scss'],
})
export class ImageBuilderComponent {
	@Input()
	control: Control;

	get payload() {
		return this.control.payload as ImagePayload;
	}
}
