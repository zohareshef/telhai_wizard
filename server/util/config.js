import dotenv from 'dotenv';
dotenv.config();

export default {
	env: process.env.NODE_ENV,
	port: process.env.PORT || 5000,
	db: {
		host: process.env.MONGO_URI,
		user: process.env.MONGO_USERNAME,
		pass: process.env.MONGO_PASSWORD,
	},
	jwt: {
		secret: process.env.JWT_SECRET
	}
};