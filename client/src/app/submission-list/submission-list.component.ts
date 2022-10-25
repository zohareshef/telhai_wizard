import { Clipboard } from '@angular/cdk/clipboard';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, take } from 'rxjs';
import { WizardService } from '../wizard/wizard.service';
import { Submission } from '../wizard/wizard.types';

@Component({
	selector: 'app-submission-list',
	templateUrl: './submission-list.component.html',
	styleUrls: ['./submission-list.component.scss'],
})
export class SubmissionListComponent implements OnInit {
	loading = true;
	error: string;
	submissions: Submission[] = [];
	submissionLink: string;
	constructor(
		private wizardService: WizardService,
		private router: Router,
		private route: ActivatedRoute,
		private clipboard: Clipboard,
		private snackbar: MatSnackBar
	) {}

	get wizard() {
		return this.submissions?.[0].wizard._id;
	}

	viewSubmision(submission: Submission) {
		this.router.navigate(['submissions', submission._id]);
	}

	copyLink() {
		this.clipboard.copy(this.submissionLink);
		this.snackbar.open('Link copied to clipboard', '', {
			duration: 1000,
		});
	}
	ngOnInit(): void {
		this.route.params.pipe(take(1)).subscribe(params => {
			const id = params['wizardId'];
			const { protocol, host } = window.location;
			this.submissionLink = `${protocol}//${host}/wizards/${id}`;

			this.wizardService
				.getSubmissions(id)
				.pipe(finalize(() => (this.loading = false)))
				.subscribe(submissions => (this.submissions = submissions));
		});
	}
}
