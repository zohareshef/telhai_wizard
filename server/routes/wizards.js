import express from 'express';
import mongoose from 'mongoose';
import hasRoles from '../middleware/hasRoles.js';

import { WizardService } from '../services/wizard.js';

const router = express.Router();


router.get('/', async (req, res) => {
	const service = new WizardService(req.auth);
	const wizards = await service.getWizards();
	res.send(wizards);
});

router.get('/:id', async (req, res) => {
	const service = new WizardService(req.auth);
	const { id } = req.params;

	if(!mongoose.isValidObjectId(id)){
		return res.sendStatus(400);
	}

	const wizard = await service.getWizard(id);

	if (!wizard) {
		return res.sendStatus(400);
	}

	res.send(wizard);
});

router.post('/', async (req, res) => {
	const service = new WizardService(req.auth);
	const wizard = await service.createWizard(req.body);
	res.send(wizard);
});

router.post('/:id/submissions', async (req, res) => {
	const service = new WizardService(req.auth);
	const { id } = req.params;
	if( !id ){
		return res.sendStatus(400);
	}
	const wizard = await service.submitWizard(id, req.body);
	if( !wizard ){
		return res.sendStatus(400);
	}
	res.send(wizard);
});

router.get('/:id/submissions',hasRoles('admin','creator'), async (req,res)=>{
	const service = new WizardService(req.auth);
	const { id } = req.params;
	if( !id ){
		return res.sendStatus(400);
	}
	const submissions = await service.getWizardSubmissions(id);
	res.send(submissions);
});





router.put('/:id', async (req, res) => {
	const service = new WizardService(req.auth);
	const { id } = req.params;
	if (!id || !req.body) {
		return res.sendStatus(400);
	}

	const wizard = await service.editWizard(id,req.body);

	if (!wizard) {
		return res.sendStatus(400);
	}

	return res.json(wizard);
});

router.delete('/:id', async (req, res) => {
	const service = new WizardService(req.auth);
	const { id } = req.params;

	if (!id) {
		return res.sendStatus(400);
	}

	const deleted = await service.deleteWizard(id);

	return res.send(deleted);
});



export default router;

