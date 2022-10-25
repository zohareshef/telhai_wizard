import type { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AuthService } from '../auth/auth.service';
import * as CustomValidators from '../utils/validators';

const extractHttpError = (res: HttpErrorResponse): string =>
	res.status === 400 ? res.error.error : res.error;

@UntilDestroy()
@Component({
	selector: 'app-login-dialog',
	templateUrl: './login-dialog.component.html',
	styleUrls: ['./login-dialog.component.scss'],
})
export class LoginDialogComponent {
	loginForm = new FormGroup({
		email: new FormControl('', [Validators.email, Validators.required]),
		password: new FormControl('', [Validators.required]),
	});

	registerForm = new FormGroup({
		email: new FormControl('', [Validators.email, Validators.required]),
		firstname: new FormControl('', [Validators.required]),
		lastname: new FormControl('', [Validators.required]),
		password: new FormControl('', [
			Validators.required,
			Validators.minLength(4),
			Validators.maxLength(128),
		]),
		passwordConfirm: new FormControl('', [Validators.required]),
	});

	errors = {
		login: '',
		register: '',
	};

	constructor(
		private dialogRef: MatDialogRef<LoginDialogComponent>,
		private authService: AuthService
	) {
		// add match passwords validator
		this.registerForm.controls.passwordConfirm.addValidators(
			CustomValidators.match(this.registerForm.controls.password)
		);

		// run confirmation validator when password field changes
		this.registerForm.controls.password.valueChanges
			.pipe(untilDestroyed(this))
			.subscribe(() => {
				this.registerForm.controls.passwordConfirm.updateValueAndValidity();
			});
	}

	isFormValid(form: FormGroup) {
		return form.valid && (form.touched || form.dirty);
	}

	handleLogin() {
		const data = this.loginForm.value;
		this.loginForm.markAsUntouched();
		this.loginForm.markAsPristine();

		this.authService
			.login({
				email: data.email!,
				password: data.password!,
			})
			.subscribe({
				next: () => this.dialogRef.close(),
				error: err => (this.errors.login = extractHttpError(err)),
			});
	}

	handleRegister() {
		const data = this.registerForm.value;
		this.loginForm.markAsUntouched();
		this.loginForm.markAsPristine();
		this.authService
			.register({
				email: data.email!,
				firstname: data.firstname!,
				lastname: data.lastname!,
				password: data.password!,
			})
			.subscribe({
				next: () => this.dialogRef.close(),
				error: err => (this.errors.register = extractHttpError(err)),
			});
	}
}
