import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { DeleteWizardDialogComponent } from '../delete-wizard-dialog/delete-wizard-dialog.component';
import { WizardService } from '../wizard/wizard.service';
import { Wizard } from '../wizard/wizard.types';

@Component({
	selector: 'app-wizard-list',
	templateUrl: './wizard-list.component.html',
	styleUrls: ['./wizard-list.component.scss'],
})
export class WizardListComponent implements OnInit {
	loading = true;
	error: string;
	wizards: Wizard[];
	constructor(
		private wizardService: WizardService,
		private router: Router,
		private dialog: MatDialog
	) {}

	editWizard(wizard: Wizard) {
		this.router.navigate(['edit', wizard._id]);
	}

	deleteWizard(index: number) {
		const wizard = this.wizards[index];
		this.dialog
			.open(DeleteWizardDialogComponent, { data: wizard })
			.afterClosed()
			.subscribe((accepted: boolean) => {
				if (!accepted) {
					return;
				}
				this.wizardService.deleteWizard(wizard._id).subscribe(() => {
					this.wizards.splice(index, 1);
				});
			});
	}
	ngOnInit(): void {
		this.wizardService
			.getMyWizards()
			.pipe(finalize(() => (this.loading = false)))
			.subscribe(wizards => {
				this.wizards = wizards;
			});
	}
}
