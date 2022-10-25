import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, take } from 'rxjs';
import { WizardService } from '../wizard/wizard.service';
import { Wizard } from '../wizard/wizard.types';

@Component({
	selector: 'app-wizard-edit',
	templateUrl: './wizard-edit.component.html',
	styleUrls: ['./wizard-edit.component.scss'],
})
export class WizardEditComponent implements OnInit {
	wizard: Wizard;
	loading = true;
	error: string;
	constructor(
		private wizardService: WizardService,
		private router: Router,
		private route: ActivatedRoute
	) {}

	ngOnInit(): void {
		this.route.params.pipe(take(1)).subscribe(params => {
			this.wizardService
				.getWizardById(params['wizardId'])
				.pipe(finalize(() => (this.loading = false)))
				.subscribe(wizard => (this.wizard = wizard));
		});
	}
}
