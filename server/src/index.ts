import 'dotenv/config';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';

import { signup, signin, refreshToken, forgotPassword, refreshPassword } from './controllers/user.controller';
import { checkPassword, checkEmailAndUsername, signinMid, decipheredEmail } from './middlewars/user.middlewar'

const PORT = process.env.PORT || 4000;

const connectToMongo = async () => {
	try {
		mongoose.set('strictQuery', false)
		mongoose.connect('mongodb://db/diary') 
		console.log('database is connected')
	}
	catch(error) {
		console.log('database is not connected')
		process.exit()
	}
}
connectToMongo();

const app = express();

app.use(cors());
app.use(bodyParser({extended: true}));

app.post('/signup', checkPassword, checkEmailAndUsername, signup);
app.post('/signin', signinMid, signin);
app.post('/refresh', refreshToken);
app.post('/forgot-password', forgotPassword);
app.patch('/refresh-password/:cipherEmail', checkPassword, decipheredEmail, refreshPassword);
app.put('/update/:cipherEmail', )

app.listen(PORT, () => {
	console.log(`server running on port ${PORT}`);
});
