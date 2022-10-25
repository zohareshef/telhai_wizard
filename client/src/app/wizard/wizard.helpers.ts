import {
	FormArray,
	FormControl,
	FormGroup,
	UntypedFormArray,
	UntypedFormControl,
	UntypedFormGroup,
	Validators,
} from '@angular/forms';
import { CONTROL_DEFINITIONS } from './wizard.constants';
import * as CustomValidators from '../utils/validators';
import {
	CheckBoxPayload,
	ImagePayload,
	LabelPayload,
	SecuredPayload,
	RadioBoxPayload,
	SelectPayload,
	TextPayload,
	WizardDraft,
	Control,
	ControlPayload,
	ControlType,
	Form,
	Page,
	Wizard,
} from './wizard.types';

function createDefaultControlPayload(type: ControlType): ControlPayload {
	switch (type) {
		case 'label':
		case 'paragraph':
			return {} as LabelPayload;
		case 'secured':
			return {} as SecuredPayload;
		case 'checkbox':
			return { options: [{}] } as CheckBoxPayload;
		case 'radio':
			return { options: [{}] } as RadioBoxPayload;
		case 'image':
			return {} as ImagePayload;
		case 'select':
			return { options: [{}] } as SelectPayload;
		case 'text':
		default:
			return {
				inputType: 'text',
			} as TextPayload;
	}
}

export function createEmptyForm(): Form {
	return {
		title: '',
		description: '',
		controls: [createEmptyControl('text')],
	};
}

export function createEmptyPage(): Page {
	return {
		title: '',
		description: '',
		forms: [createEmptyForm()],
	};
}

export function createEmptyWizard(): WizardDraft {
	return {
		title: '',
		pages: [createEmptyPage()],
	};
}

export function createEmptyControl(type: ControlType): Control {
	return {
		type,
		payload: createDefaultControlPayload(type),
	};
}

export function wizardControlToIcon(type: ControlType) {
	return CONTROL_DEFINITIONS[type]?.icon;
}
