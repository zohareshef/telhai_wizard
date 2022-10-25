import { Component, Input, OnInit } from '@angular/core';
import {
	FormControl,
	UntypedFormArray,
	UntypedFormControl,
	UntypedFormGroup,
	ValidatorFn,
	Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { cloneDeep } from 'lodash';
import { catchError, EMPTY, finalize } from 'rxjs';
import { WizardService } from '../wizard/wizard.service';
import {
	AnsweredWizard,
	CheckBoxPayload,
	TextPayload,
	Wizard,
} from '../wizard/wizard.types';

const toBase64 = (file: File): Promise<string> =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result as string);
		reader.onerror = error => reject(error);
	});

@Component({
	selector: 'app-wizard-view',
	templateUrl: './wizard-view.component.html',
	styleUrls: ['./wizard-view.component.scss'],
})
export class WizardViewComponent implements OnInit {
	@Input()
	wizard: Wizard | AnsweredWizard;

	@Input()
	readonly = false;

	forms = new UntypedFormArray([]);
	submission: any = {};
	submitted = false;
	working = false;
	pageIndex: number = 0;
	error: string;

	get currentPage() {
		return this.wizard.pages[this.pageIndex];
	}

	get isPageValid() {
		return this.forms.at(this.pageIndex).valid;
	}

	get isWizardValid() {
		return this.forms.valid;
	}

	get isLastPage() {
		return this.pageIndex === this.wizard.pages.length - 1;
	}

	get disableNextButton() {
		return this.isLastPage || !this.isPageValid;
	}
	get disableBackButton() {
		return this.pageIndex === 0;
	}
	get showSuccessMessage() {
		return this.submitted;
	}
	get showErrorMessage() {
		return this.showSuccessMessage && !!this.error;
	}

	constructor(private wizardService: WizardService, private router: Router) {}

	ngOnInit(): void {
		this.initSubmissionFormGroup();
	}

	initSubmissionFormGroup() {
		const wizard = this.wizard as AnsweredWizard;
		for (const page of wizard.pages) {
			const pageForms = new UntypedFormArray([]);
			for (const form of page.forms) {
				const formForms = new UntypedFormArray([]);
				for (const control of form.controls) {
					const group = new UntypedFormGroup({});
					let value = control.value;
					let disabled = !!value;
					if (control.type === 'text' || control.type === 'secured') {
						const payload = control.payload as TextPayload;
						const validators: ValidatorFn[] = [Validators.required];
						if (payload.inputType === 'pattern') {
							validators.push(Validators.pattern(new RegExp(payload.pattern!)));
						}
						if (payload.inputType === 'range') {
							validators.push(Validators.min(payload.min!));
							validators.push(Validators.max(payload.max!));
						}
						group.addControl(
							'value',
							new UntypedFormControl({ value, disabled }, validators)
						);
					} else if (control.type === 'checkbox') {
						const payload = control.payload as CheckBoxPayload;
						value = value ?? payload.options.map(x => false);
						group.addControl('value', new UntypedFormControl(value));
					} else if (control.type === 'radio') {
						value = value ?? 0;
						group.addControl('value', new UntypedFormControl(value));
					} else if (control.type == 'select' || control.type === 'image') {
						group.addControl(
							'value',
							new UntypedFormControl({ value, disabled }, [Validators.required])
						);
					}

					formForms.push(group);
				}
				pageForms.push(formForms);
			}
			this.forms.push(pageForms);
		}
	}

	async generateSubmission() {
		const result: AnsweredWizard = cloneDeep(this.wizard) as AnsweredWizard;
		const answers = this.forms.value as any[];
		for (let i = 0; i < result.pages.length; i++) {
			const page = result.pages[i];
			for (let j = 0; j < page.forms.length; j++) {
				const form = page.forms[j];
				for (let k = 0; k < form.controls.length; k++) {
					const control = form.controls[k];
					const answer = answers[i][j][k];
					control.value = answer.value;
					if (answer.value instanceof File) {
						control.value = await toBase64(answer.value);
					}
				}
			}
		}
		return result;
	}

	get showSubmit() {
		return !this.readonly && this.isLastPage && !this.submitted;
	}

	get disableSubmit() {
		return !this.isWizardValid || this.working;
	}

	get showNextButton() {
		return this.readonly || !this.isLastPage;
	}

	get showSuccessButton() {
		return !this.working && this.submitted;
	}

	async submit() {
		this.error = '';
		const answered = await this.generateSubmission();

		this.wizardService
			.submit(this.wizard._id, answered)
			.pipe(
				finalize(() => {
					this.working = false;
				}),
				catchError(() => {
					this.error = 'An error occured while submitting the form';
					return EMPTY;
				})
			)
			.subscribe(result => {
				this.submitted = true;
				setTimeout(() => {
					this.router.navigate(['/']);
				}, 3000);
			});
	}

	getControl(pageIndex: number, formIndex: number, controlIndex: number) {
		const page = this.forms.at(pageIndex) as UntypedFormArray;
		const form = page.at(formIndex) as UntypedFormArray;
		const control = form.at(controlIndex) as UntypedFormGroup;
		return control.controls['value'] as FormControl;
	}

	pageNext() {
		if (this.pageIndex != this.wizard.pages.length - 1) {
			this.pageIndex++;
		}
	}

	pageBack() {
		if (this.pageIndex > 0) {
			this.pageIndex--;
		}
	}
}
