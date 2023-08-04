import { Request, Response, NextFunction } from 'express';

import UserSchema from '../db/user/user.schema';
import { comparer } from '../lib/hasher';
import { IUser } from 'db/user/user.types';

export const chaeckPasswrod = async (req: Request, res: Response, next: NextFunction) => {
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
