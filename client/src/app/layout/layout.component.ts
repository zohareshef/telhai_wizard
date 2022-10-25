import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/auth.types';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';

@Component({
	selector: 'app-layout',
	templateUrl: './layout.component.html',
	styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
	user$: Observable<User | null>;

	constructor(private dialog: MatDialog, private auth: AuthService) {
		this.user$ = this.auth.user$;
	}

	handleLogout() {
		this.auth.logout();
	}

	openDialog() {
		this.dialog.open(LoginDialogComponent);
	}
}
