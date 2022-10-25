import express from 'express';
import jwt from '../middleware/jwt.js';
import authRouter from './auth.js';
import usersRouter from './users.js';
import wizardsRouter from './wizards.js';
import submissionsRouter from './submissions.js';
const apiRouter = express.Router();


apiRouter.use('/auth', authRouter);
apiRouter.use('/users', jwt, usersRouter);
apiRouter.use('/wizards', jwt, wizardsRouter);
apiRouter.use('/submissions',jwt,submissionsRouter);
export default apiRouter;

