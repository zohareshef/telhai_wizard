import { Component, OnInit } from '@angular/core';
import { ParagraphPayload } from 'src/app/wizard/wizard.types';
import { BaseControlComponent } from '../base-control.component';

@Component({
	selector: 'app-paragraph-control',
	templateUrl: './paragraph-control.component.html',
	styleUrls: ['../shared-styles.scss'],
})
export class ParagraphControlComponent extends BaseControlComponent<ParagraphPayload> {}
