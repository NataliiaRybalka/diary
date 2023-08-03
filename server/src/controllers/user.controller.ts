import { Request, Response } from 'express';

import UserSchema from '../db/user/user.schema';
import { hasher, comparer } from '../lib/hasher';

export const signup = async (req: Request, res: Response) => {
	const { email, username, password } = req.body;

	if (password.length < 6) return res.status(403).json('Password must have 6 or more symbols');

	try {
		const userfromDb = await UserSchema.find({ $or:[ {email}, {username}]});
		if (userfromDb.length) return res.status(403).json('This email or username already exists.');

		const hashedPassword = await hasher(password);
		await UserSchema.create({ email, username, password: hashedPassword });
		return res.status(201).json(username);
	} catch (e){
		return res.status(400).json(e);
	}
};