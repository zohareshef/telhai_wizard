import mongoose from 'mongoose';

const SubmissionSchema = new mongoose.Schema({
	wizard: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Wizard',
		required: true
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	snapshot: {
		type:  mongoose.Schema.Types.Mixed,
		required:true
	},
	created: { type: Date, default: Date.now }
}, { versionKey: false });


export const Submission = mongoose.model('Submission', SubmissionSchema);


