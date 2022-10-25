import { AbstractControl, ValidationErrors } from '@angular/forms';

export function regex(control: AbstractControl): ValidationErrors | null {
	let valid = true;
	try {
		new RegExp(control.value);
	} catch {
		valid = false;
	}
	if (valid) {
		return null;
	}
	return { regex: true };
}
