import mongoose from 'mongoose';
import { CONTROL_TYPES } from '../util/constants.js';


const WizardSchema = new mongoose.Schema({
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	title: {
		type: String,
		required: true
	},
	created: {
		type: Date,
		default: Date.now,
		required: true
	},
	updated: {
		type: Date,
	},
	pages: [{
		_id:false,
		title: { type: String, required: true },
		description: { type: String },
		forms: [{
			_id:false,
			title: { type: String, required: true },
			description: { type: String },
			controls: [{
				_id:false,
				type: {
					type: String,
					enum: Object.values(CONTROL_TYPES),
					required: true
				},
				payload:{
					type:mongoose.Schema.Types.Mixed,
					required:true,
				},
			}]
		}],
	}]
}, { versionKey: false });

export const Wizard = mongoose.model('Wizard', WizardSchema);



