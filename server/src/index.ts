import 'dotenv/config';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';

import diaryController from './controllers/diary';
import userController from './controllers/user';
import middlewar from './middlewars';

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
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// user
app.post('/signup', middlewar.checkPassword, middlewar.checkEmailAndUsername, userController.signup);
app.post('/signin', middlewar.signinMid, userController.signin);
app.post('/signin-google', userController.signinGoogle);
app.get('/user/:id', middlewar.isActive, userController.getUserData);
app.put('/user/:id', middlewar.isActive, userController.updateUserData);
app.delete('/user/:id', middlewar.isActive, userController.deactivateUser);
app.post('/refresh-token', userController.refreshToken);
app.post('/forgot-password/:username', middlewar.isActive, userController.forgotPassword);
app.patch('/refresh-password/:cipherEmail', middlewar.checkPassword, middlewar.decipheredEmail, userController.refreshPassword);

app.post('/day-plan', diaryController.postDayPlan);
app.get('/week-plan/:firstDate', diaryController.getWeekPlan);
app.put('/week-plan/:date', diaryController.putWeekPlan);

app.listen(PORT, () => {
	console.log(`server running on port ${PORT}`);
});
