import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'app-wizard-form',
	templateUrl: './wizard-form.component.html',
	styleUrls: ['./wizard-form.component.scss'],
})
export class WizardFormComponent implements OnInit {
	@Input()
	form: object;
	constructor() {}

	ngOnInit(): void {}
}
