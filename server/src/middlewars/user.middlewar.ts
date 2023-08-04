import { Request, Response, NextFunction } from 'express';

import UserSchema from '../db/user/user.schema';
import { comparer } from '../lib/hasher';
import { IUser } from 'db/user/user.types';
import { decipheredText } from '../lib/encryption';

export const checkPassword = async (req: Request, res: Response, next: NextFunction) => {
	const { password } = req.body;

	if (password.length < 6) return res.status(403).json('Password must have 6 or more symbols');
	else next();
};

export const checkEmailAndUsername = async (req: Request, res: Response, next: NextFunction) => {
	const { email, username } = req.body;

	try {
		const user = await UserSchema.findOne({ $or:[ {email}, {username}]}) as IUser;
		if (user) return res.status(403).json('This email or username already exists.');

		next();
	} catch (e) {
		res.status(400).json(e);
	}
};

export const signinMid = async (req: Request, res: Response, next: NextFunction) => {
	const { email, password } = req.body;

	const user = await UserSchema.findOne({ email }) as IUser;
	if (!user) res.status(404).json('Wrong email or password');

	const isCompared = await comparer(password, user.password);
	if (!isCompared) res.status(404).json('Wrong email or password');
	next();
};

export const decipheredEmail = async (req: Request, res: Response, next: NextFunction) => {
	const { cipherEmail } = req.params;
	const email = await decipheredText(cipherEmail);

	req.body.email = email;
	next();
};

export const isActive = async (req: Request, res: Response, next: NextFunction) => {
	const { username } = req.params;

	const user = await UserSchema.findOne({ username });

	if (user && user.isActive) {
		req.body.email = user.email;
		next();
	}
	else res.status(404).json('Not found');
};
