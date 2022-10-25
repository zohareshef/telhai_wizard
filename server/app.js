import express from 'express';
import mongoose from 'mongoose';
import apiRouter from './routes/index.js';
import config from './util/config.js';
import path from 'path';
mongoose.connect(config.db.host, {
	user: config.db.user,
	pass: config.db.pass,
});

const app = express();

app.use((req, res, next) => {
	console.log(`${req.method} : ${req.url}`);
	return next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', apiRouter);
app.use(express.static(path.resolve('../client/dist/wizard-app')));

// Always return the main index.html, so react-router render the route in the client
app.get('*', (req, res) => {
	res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
	res.header('Expires', '-1');
	res.header('Pragma', 'no-cache');
	res.sendFile(path.resolve('../client/dist/wizard-app/index.html'));
});

export default app;