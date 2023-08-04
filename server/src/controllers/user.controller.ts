import { Request, Response } from 'express';

import UserSchema from '../db/user/user.schema';
import { IUser } from '../db/user/user.types';
import { hasher } from '../lib/hasher';
import { createTokens, verifyToken } from '../lib/token';
import { sendMail } from '../lib/mail';

export const signup = async (req: Request, res: Response) => {
	const { email, username, password } = req.body;

	try {
		const hashedPassword = await hasher(password);
		await UserSchema.create({ email, username, password: hashedPassword });

		const { accessToken, refreshToken } = await createTokens(username, email);
		await sendMail(email, 'EMAIL_WELCOME');

		return res
		.cookie('jwt', refreshToken, {
			httpOnly: true, 
            secure: true, 
            maxAge: 24 * 60 * 60 * 1000
		})
		.status(201)
		.json({
			username,
			accessToken,
			refreshToken,
		});
	} catch (e){
		return res.status(400).json(e);
	}
};

export const signin = async (req: Request, res: Response) => {
	const { email } = req.body;

	const user = await UserSchema.findOne({ email }) as IUser;
	
	const { accessToken, refreshToken } = await createTokens(user.username, email);

	return res
	.cookie('jwt', refreshToken, {
		httpOnly: true, 
        secure: true, 
        maxAge: 24 * 60 * 60 * 1000
	})
	.status(200)
	.json({
		username: user.username,
		accessToken,
		refreshToken,
	});
};

export const refreshToken = async (req: Request, res: Response) => {
	const { cookie } = req.headers;
	const { email, username } = req.body;
	
	if (cookie) {
		const result = await verifyToken(cookie, email, username);
		if (result !== 'Unauthorized') return res.json({ accessToken: result });
		else return res.status(401).json({ message: 'Unauthorized' });
    } else {
        return res.status(401).json({ message: 'Unauthorized' });
    }
};

export const refreshPassword = async (req: Request, res: Response) => {
	res.json('ok');
};
