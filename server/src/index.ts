import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';

const PORT = process.env.PORT || 4000;

// @ts-ignore
mongoose.connect('mongodb://db/diary', (err, db) => {
	if(err) console.log('database is not connected');
	else console.log('database is connected');
});

const app = express();

app.listen(PORT, () => {
	console.log(`server running on port ${PORT}`);
});
