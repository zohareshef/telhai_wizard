import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Wizard } from '../wizard/wizard.types';

@Component({
	selector: 'app-delete-wizard-dialog',
	templateUrl: './delete-wizard-dialog.component.html',
	styleUrls: ['./delete-wizard-dialog.component.scss'],
})
export class DeleteWizardDialogComponent {
	constructor(
		private dialogRef: MatDialogRef<DeleteWizardDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public wizard: Wizard
	) {}
}
