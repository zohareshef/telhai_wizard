import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';

@Component({
	selector: 'app-login-page',
	templateUrl: './login-page.component.html',
	styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
	constructor(
		private auth: AuthService,
		private dialog: MatDialog,
		private router: Router
	) {}

	ngOnInit(): void {
		if (this.auth.user) {
			this.auth.logout();
		}
		this.dialog
			.open(LoginDialogComponent, { disableClose: true })
			.afterClosed()
			.subscribe(() => {
				this.router.navigate(['/'], { replaceUrl: true });
			});
	}
}
