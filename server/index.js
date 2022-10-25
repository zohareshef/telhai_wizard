import config from './util/config.js';
import app from './app.js';

app.listen(config.port, () => {
	console.log(`server is running on http://localhost:${config.port}`);
});
