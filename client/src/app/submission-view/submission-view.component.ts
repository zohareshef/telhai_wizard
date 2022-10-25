import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { WizardService } from '../wizard/wizard.service';
import { Submission } from '../wizard/wizard.types';

@Component({
	selector: 'app-submission-view',
	templateUrl: './submission-view.component.html',
	styleUrls: ['./submission-view.component.scss'],
})
export class SubmissionViewComponent implements OnInit {
	submission: Submission;

	constructor(
		private wizardService: WizardService,
		private route: ActivatedRoute
	) {}

	get wizard() {
		return this.submission.snapshot;
	}

	ngOnInit(): void {
		this.route.params.pipe(take(1)).subscribe(params => {
			this.wizardService
				.getSubmissionById(params['submissionId'])
				.subscribe(submission => {
					this.submission = submission;
				});
		});
	}
}
