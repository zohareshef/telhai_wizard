import { User } from '../auth/auth.types';

export type LabelPayload = {
	text: string;
};

export type ParagraphPayload = LabelPayload;

export type InputType = 'text' | 'number' | 'pattern' | 'range';

export type TextPayload = {
	placeholder: string;
	label: string;
	inputType: InputType;
	pattern?: string;
	min?: number;
	max?: number;
};

export type SecuredPayload = {
	placeholder: string;
	label: string;
};

export type CheckboxOption = {
	text: string;
};

export type CheckBoxPayload = {
	label: string;
	options: CheckboxOption[];
};

export type RadioBoxPayload = CheckBoxPayload;

export type ImagePayload = {
	label: string;
	placeholder: string;
};

export type SelectPayload = {
	label: string;
	placeholder: string;
	options: CheckboxOption[];
};

export type ControlPayload =
	| LabelPayload
	| ParagraphPayload
	| TextPayload
	| SecuredPayload
	| CheckBoxPayload
	| RadioBoxPayload
	| ImagePayload
	| SelectPayload;

export type ControlType =
	| 'label'
	| 'paragraph'
	| 'text'
	| 'secured'
	| 'checkbox'
	| 'radio'
	| 'image'
	// | 'image-list' too hard
	| 'select';

export type Control = {
	type: ControlType;
	payload: ControlPayload;
};

export type WizardDraft = {
	title: string;
	pages: Page[];
};

export interface Wizard extends WizardDraft {
	_id: string;
	author: User;
	created: string;
	updated?: string;
}

export interface AnsweredControl extends Control {
	value: any;
}

export interface AnsweredForm extends Form {
	controls: AnsweredControl[];
}

export interface AnsweredPage extends Page {
	forms: AnsweredForm[];
}

export interface AnsweredWizard extends Wizard {
	pages: AnsweredPage[];
}

export type Submission = {
	_id: string;
	wizard: Wizard;
	user: User;
	snapshot: AnsweredWizard;
	created: string;
};

export type Page = {
	title: string;
	description: string;
	forms: Form[];
};

export type Form = {
	title: string;
	description: string;
	controls: Control[];
};
