import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Submission } from '../wizard/wizard.types';

@Component({
	selector: 'app-submission-card',
	templateUrl: './submission-card.component.html',
	styleUrls: ['./submission-card.component.scss'],
})
export class SubmissionCardComponent {
	@Input()
	submission: Submission;
	@Output()
	view = new EventEmitter();

	get author() {
		return this.submission.user;
	}

	constructor() {}
}
