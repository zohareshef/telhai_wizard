import { Component } from '@angular/core';
import { SelectPayload } from 'src/app/wizard/wizard.types';
import { BaseControlComponent } from '../base-control.component';

@Component({
	selector: 'app-select-control',
	templateUrl: './select-control.component.html',
	styleUrls: ['../shared-styles.scss'],
})
export class SelectControlComponent extends BaseControlComponent<SelectPayload> {}
