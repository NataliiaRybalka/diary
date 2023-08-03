import bodyParser from 'body-parser';
import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';

import { signup } from './controllers/user.controller';

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

app.post('/signup', signup);

app.listen(PORT, () => {
	console.log(`server running on port ${PORT}`);
});
