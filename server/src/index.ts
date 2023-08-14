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
app.put('/user/:id', middlewar.isActive, userController.putUserData);
app.delete('/user/:id', middlewar.isActive, userController.deactivateUser);
app.post('/refresh-token', userController.refreshToken);
app.post('/forgot-password/:username', middlewar.isActive, userController.forgotPassword);
app.patch('/refresh-password/:cipherEmail', middlewar.checkPassword, middlewar.decipheredEmail, userController.refreshPassword);

app.post('/diary/day-plan/:userId', diaryController.postDayPlan);
app.get('/diary/week-plan/:userId/:firstDate', diaryController.getWeekPlan);
app.put('/diary/week-plan/:id', diaryController.putWeekPlan);

app.post('/diary/page/:userId/:date', diaryController.postPage);
app.get('/diary/page/:userId/:date', diaryController.getPage);
app.put('/diary/page/:id', diaryController.putPage);

app.post('/diary/menstrual-cycle/:userId', diaryController.postMenstrualCycle);

app.listen(PORT, () => {
	console.log(`server running on port ${PORT}`);
});
