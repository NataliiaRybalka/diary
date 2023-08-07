import 'dotenv/config';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';

import { signup, signin, getUserData, updateUserData, deactivateUser, refreshToken, forgotPassword, refreshPassword } from './controllers/user.controller';
import { checkPassword, checkEmailAndUsername, signinMid, decipheredEmail, isActive } from './middlewars/user.middlewar'

const PORT = process.env.PORT || 4000;

const connectToMongo = async () => {
	try {
		mongoose.set('strictQuery', false);
		mongoose.connect('mongodb://db/diary') ;
		console.log('database is connected');
	}
	catch(error) {
		console.log('database is not connected');
		process.exit();
	}
}
connectToMongo();

const app = express();

app.use(cors());
app.use(bodyParser({extended: true}));

app.post('/signup', checkPassword, checkEmailAndUsername, signup);
app.post('/signin', signinMid, signin);
app.get('/user/:id', isActive, getUserData);
app.put('/user/:id', isActive, updateUserData);
app.delete('/user/:id', isActive, deactivateUser);
app.post('/refresh-token', refreshToken);
app.post('/forgot-password/:username', isActive, forgotPassword);
app.patch('/refresh-password/:cipherEmail', checkPassword, decipheredEmail, refreshPassword);

app.listen(PORT, () => {
	console.log(`server running on port ${PORT}`);
});
