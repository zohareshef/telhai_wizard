import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Clipboard } from '@angular/cdk/clipboard';
import { Wizard } from '../wizard/wizard.types';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
	selector: 'app-wizard-card',
	templateUrl: './wizard-card.component.html',
	styleUrls: ['./wizard-card.component.scss'],
})
export class WizardCardComponent {
	@Input()
	wizard: Wizard;

	@Output()
	delete = new EventEmitter<Wizard>();

	@Output()
	edit = new EventEmitter<Wizard>();

	copyLink() {
		const { protocol, host } = window.location;
		this.clipboard.copy(`${protocol}//${host}/wizards/${this.wizard._id}`);
		this.snackbar.open('Link copied to clipboard', '', { duration: 1000 });
	}

	showSubmissions() {
		this.router.navigate(['wizards', this.wizard._id, 'submissions']);
	}

	get author() {
		return this.wizard.author;
	}

	get showSubmissionsBtn() {
		return this.auth.user?.role === 'admin';
	}
	constructor(
		private snackbar: MatSnackBar,
		private clipboard: Clipboard,
		private router: Router,
		private auth: AuthService
	) {}
}
