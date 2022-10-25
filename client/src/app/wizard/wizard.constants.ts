import { InputType, ControlType } from './wizard.types';

type WizardControlDefinition = {
	type: ControlType;
	icon: string;
	name: string;
};

type WizardControlDefinitionMap = {
	[key in ControlType]: WizardControlDefinition;
};

export const CONTROL_DEFINITIONS: WizardControlDefinitionMap = {
	label: {
		type: 'label',
		icon: 'label',
		name: 'label',
	},
	paragraph: {
		type: 'paragraph',
		icon: 'view_headline',
		name: 'paragraph',
	},
	text: {
		type: 'text',
		icon: 'rtt',
		name: 'text input',
	},
	secured: {
		type: 'secured',
		icon: 'password',
		name: 'secured input',
	},
	checkbox: {
		type: 'checkbox',
		icon: 'check_box',
		name: 'check box',
	},
	radio: {
		type: 'radio',
		icon: 'radio_button_checked',
		name: 'radio box',
	},
	image: {
		type: 'image',
		icon: 'image',
		name: 'image upload',
	},
	select: {
		type: 'select',
		icon: 'menu_open',
		name: 'select list',
	},
};

export const WIZARD_CONTROL_TYPES = Object.values(CONTROL_DEFINITIONS).map(
	x => x.type
);

export const INPUT_TYPES: InputType[] = ['text', 'number', 'pattern', 'range'];
