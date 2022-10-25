import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function match(source: AbstractControl): ValidatorFn {
	return (control: AbstractControl): ValidationErrors | null => {
		return source.value !== control.value
			? { match: { value: control.value } }
			: null;
	};
}
