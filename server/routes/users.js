import express from 'express';
import { User } from '../models/user.js';

const router = express.Router();

router.get('/:id', async (req, res) => {
	const { id } = req.params;
	const user = await User.findById(id).lean();
	if (user == null) {
		res.status(400).send({ error: 'user not found' });
	}
	res.send(user);
});

export default router;

