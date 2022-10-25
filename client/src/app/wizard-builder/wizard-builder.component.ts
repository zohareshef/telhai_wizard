import {
	Component,
	EventEmitter,
	Input,
	OnInit,
	Output,
	ViewChild,
} from '@angular/core';
import { MatTabGroup } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';

import {
	createEmptyControl,
	createEmptyForm,
	createEmptyPage,
	createEmptyWizard,
} from '../wizard/wizard.helpers';
import { WizardService } from '../wizard/wizard.service';
import { Form, Page, Wizard, WizardDraft } from '../wizard/wizard.types';

@Component({
	selector: 'app-wizard-builder',
	templateUrl: './wizard-builder.component.html',
	styleUrls: ['./wizard-builder.component.scss'],
})
export class WizardBuilderComponent implements OnInit {
	@ViewChild(MatTabGroup)
	tabs: MatTabGroup;

	@Input()
	wizard: Wizard | WizardDraft;

	@Output()
	save = new EventEmitter<Wizard>();

	isSaving = false;

	constructor(private wizardService: WizardService, private router: Router) {}

	ngOnInit(): void {
		if (!this.wizard) {
			this.wizard = createEmptyWizard();
		}
	}

	saveWizard() {
		this.isSaving = true;
		const wizard = this.wizard as Wizard;
		if (wizard._id) {
			this.wizardService
				.updateWizard(wizard)
				.pipe(finalize(() => (this.isSaving = false)))
				.subscribe(res => {
					this.router.navigate(['my-wizards']);
				});
		} else {
			this.wizardService
				.createWizard(this.wizard)
				.pipe(finalize(() => (this.isSaving = false)))
				.subscribe(res => {
					this.router.navigate(['my-wizards']);
				});
		}
	}

	addPage() {
		const page = createEmptyPage();
		this.wizard.pages.push(page);
		this.tabs.selectedIndex = this.wizard.pages.length - 1;
	}

	deletePage(pageIndex: number) {
		this.wizard.pages.splice(pageIndex, 1);
		// if last page, move to previous page
		if (this.wizard.pages.length == pageIndex) {
			this.tabs.selectedIndex = pageIndex - 1;
		}
	}

	addForm(page: Page) {
		const form = createEmptyForm();
		page.forms.push(form);
	}

	deleteForm(event: MouseEvent, pageIndex: number, formIndex: number) {
		event.stopPropagation();
		if (this.wizard.pages[pageIndex].forms.length > 1) {
			this.wizard.pages[pageIndex].forms.splice(formIndex, 1);
		}
	}

	addNewControl(form: Form) {
		const control = createEmptyControl('text');
		form.controls.push(control);
	}

	removeControl(form: Form, index: number) {
		form.controls.splice(index, 1);
	}

	moveControl(form: Form, index: number, direction: 'up' | 'down') {
		let diff = direction == 'down' ? 1 : -1;

		const current = form.controls[index];
		form.controls[index] = form.controls[index + diff];
		form.controls[index + diff] = current;
	}
}
