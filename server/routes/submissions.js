import express from 'express';
import hasRoles from '../middleware/hasRoles.js';

import { WizardService } from '../services/wizard.js';

const router = express.Router();


router.get('/:id',hasRoles('admin'), async (req,res)=>{
	const service = new WizardService(req.auth);
	const { id } = req.params;
	if( !id ){
		return res.sendStatus(400);
	}
	const submission = await service.getSubmissionById(id);
	res.send(submission);
});



export default router;

