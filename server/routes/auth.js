import express from 'express';
import jsonwebtoken from 'jsonwebtoken';
import { User } from '../models/user.js';
import { LoginValidator, RegisterValidator } from '../util/validators.js';

const router = express.Router();


router.post('/register', async (req, res) => {
	const result = RegisterValidator.validate(req.body, { stripUnknown: true });
	if (result.error) {
		return res.status(400).send({ error: result.error.toString() });
	}

	if (await User.exists({ email: result.value.email }) != null) {
		return res.status(400).send({ error: 'email already exists' });
	}

	const user = await User.create(result.value);
	res.send({ token: createAuthToken(user) });
});
		

router.post('/login', async (req, res) => {

	const result = LoginValidator.validate(req.body, { abortEarly: false, stripUnknown: true });
	if (result.error) {
		return res.status(400).send({ error: result.error.toString() });
	}

	const user = await User.findOne(result.value).lean();

	if (!user) {
		return res.status(400).send({ error: 'wrong email or password' });
	}

	res.send({ token: createAuthToken(user) });
});



function createAuthToken(user) {
	return jsonwebtoken.sign({
		_id: user._id,
		firstname: user.firstname,
		lastname: user.lastname,
		email: user.email,
		role: user.role,
	}, process.env.JWT_SECRET);
}

export default router;