import { Component } from '@angular/core';
import { LabelPayload } from 'src/app/wizard/wizard.types';
import { BaseControlComponent } from '../base-control.component';

@Component({
	selector: 'app-label-control',
	templateUrl: './label-control.component.html',
	styleUrls: ['../shared-styles.scss'],
})
export class LabelControlComponent extends BaseControlComponent<LabelPayload> {}
