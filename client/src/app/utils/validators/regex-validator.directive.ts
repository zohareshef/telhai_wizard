import { Directive } from '@angular/core';
import {
	AbstractControl,
	NG_VALIDATORS,
	ValidationErrors,
	Validator,
	ValidatorFn,
} from '@angular/forms';

@Directive({
	selector: '[appValidRegex]',
	providers: [
		{
			provide: NG_VALIDATORS,
			useExisting: RegexValidatorDirective,
			multi: true,
		},
	],
})
export class RegexValidatorDirective implements Validator {
	validate(control: AbstractControl<any, any>): ValidationErrors | null {
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
}
