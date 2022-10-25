import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { catchError, EMPTY, finalize, take } from 'rxjs';
import { WizardService } from '../wizard/wizard.service';
import { Wizard } from '../wizard/wizard.types';

@Component({
	selector: 'app-submit-wizard',
	templateUrl: './submit-wizard.component.html',
	styleUrls: ['./submit-wizard.component.scss'],
})
export class SubmitWizardComponent implements OnInit {
	wizard: Wizard;
	error: string;
	loading = true;

	constructor(
		private wizardService: WizardService,
		private router: Router,
		private route: ActivatedRoute
	) {}

	ngOnInit(): void {
		this.route.params
			.pipe(
				take(1),
				finalize(() => (this.loading = false)),
				catchError(error => {
					this.error = error.message;
					return EMPTY;
				})
			)
			.subscribe(params => {
				this.wizardService
					.getWizardById(params['wizardId'])
					.subscribe(wizard => {
						this.wizard = wizard;
					});
			});
	}
}
