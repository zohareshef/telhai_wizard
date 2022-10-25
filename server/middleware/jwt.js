import { expressjwt } from 'express-jwt';
import config from '../util/config.js';

export default expressjwt({
	secret: config.jwt.secret,
	algorithms: ['HS256']
});


