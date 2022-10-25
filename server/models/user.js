import mongoose from 'mongoose';
import isEmail from 'validator/lib/isEmail.js';

const UserSchema = new mongoose.Schema({
	email: {
		type: String,
		lowercase: true,
		unique: true,
		validate: [isEmail, 'email is not valid'],
		required: true
	},
	password: {
		type: String,
		select: false,
		minlength: 4,
		maxlength: 128,
		required: true
	},
	firstname: {
		type: String,
		required: true
	},
	lastname: {
		type: String,
		required: true
	},
	role: {
		type: String,
		enum: ['admin', 'creator', 'user'],
		default: 'user',
		required: true
	},
	created: { type: Date, default: Date.now }
}, { versionKey: false });


export const User = mongoose.model('User', UserSchema);


