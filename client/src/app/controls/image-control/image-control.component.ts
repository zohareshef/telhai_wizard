import { Component, NgZone, OnInit } from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';
import { ImagePayload } from 'src/app/wizard/wizard.types';
import { BaseControlComponent } from '../base-control.component';

@Component({
	selector: 'app-image-control',
	templateUrl: './image-control.component.html',
	styleUrls: ['../shared-styles.scss'],
})
export class ImageControlComponent
	extends BaseControlComponent<ImagePayload>
	implements OnInit
{
	constructor(private zone: NgZone) {
		super();
	}

	ngOnInit(): void {
		this.filename.setValue(this._formControl.value?.name);
	}
	filename = new UntypedFormControl(null, [Validators.required]);

	onFileClear() {
		this._formControl.setValue(null);
		this.filename.setValue(null);
	}
	onFileSelected(event: Event) {
		const element = event.target as HTMLInputElement;
		if (element.files?.length) {
			const file = element.files[0];
			this._formControl.setValue(file);
			this.filename.setValue(file.name);
		}
		element.value = '';
	}
	openImage() {
		const w = window.open('', '_blank');
		const img = new Image();
		img.src = this._formControl.value;
		w?.document.write(img.outerHTML);
	}
}
