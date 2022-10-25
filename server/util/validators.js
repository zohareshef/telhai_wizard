import Joi from 'joi';


export const RegisterValidator = Joi.object({
	email: Joi.string().trim().lowercase().email().required(),
	password: Joi.string().min(4).max(128).required(),
	firstname: Joi.string().trim().required().min(1).alphanum().required(),
	lastname: Joi.string().trim().required().min(1).alphanum().required(),
}).preferences({ abortEarly: false });

export const LoginValidator = Joi.object({
	email: Joi.string().trim().lowercase().email().required(),
	password: Joi.string().required(),
});




