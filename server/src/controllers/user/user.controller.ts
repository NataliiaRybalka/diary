import { Request, Response } from 'express';

import { cipheredText } from '../../lib/encryption';
import { createTokens, verifyToken } from '../../lib/token';
import { IUser } from '../../db/user/user.types';
import { hasher } from '../../lib/hasher';
import { sendMail } from '../../lib/mail';
import UserSchema from '../../db/user/user.schema';
import { WEB } from '../../lib/constants';

export const signup = async (req: Request, res: Response) => {
	const { email, username, password, language } = req.body;

	try {
		const hashedPassword = await hasher(password);
		const user = await UserSchema.create({ email, username, password: hashedPassword, language }) as IUser;

		const { accessToken, refreshToken } = await createTokens(username, email);
		await sendMail(email, 'EMAIL_WELCOME', { username });

		return res
		.cookie('jwt', refreshToken, {
			httpOnly: true, 
            secure: true, 
            maxAge: 24 * 60 * 60 * 1000
		})
		.status(201)
		.json({
			user,
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
		user,
		accessToken,
		refreshToken,
	});
};

export const signinGoogle = async (req: Request, res: Response) => {
	const { username, email } = req.body;

	try {
		let user = await UserSchema.findOne({ email }) as IUser;
		if (!user) {
			const hashedPassword = await hasher(email);
			user = await UserSchema.create({ email, username, password: hashedPassword}) as IUser;
		}

		const { accessToken, refreshToken } = await createTokens(username, email);
		await sendMail(email, 'EMAIL_WELCOME', { username });

		return res
		.cookie('jwt', refreshToken, {
			httpOnly: true, 
            secure: true, 
            maxAge: 24 * 60 * 60 * 1000
		})
		.status(200)
		.json({
			user,
			accessToken,
			refreshToken,
		});
	} catch (e){
		return res.status(400).json(e);
	}
};

export const getUserData = async (req: Request, res: Response) => {
	const { id } = req.params;
	
	try {
		const user = await UserSchema.findById(id) as IUser;
		res.status(200).json(user);
	} catch (e) {
		res.status(404).json('Not found');
	}
};

export const updateUserData = async (req: Request, res: Response) => {
	const { id } = req.params;
	const userData = req.body;

	try {
		const user = await UserSchema.findById(id) as IUser;
		if (!user) return res.status(404).json('Not found');

		let hashedPassword = user.password;
		let newUsername = user.username;
		let newLanguage = user.language;
		if (userData.password) hashedPassword = await hasher(userData.password);
		if (userData.username) newUsername = userData.username;
		if (userData.language) newLanguage = userData.language;

		await UserSchema.updateOne({ _id: id }, { username: newUsername, password: hashedPassword, language: newLanguage });
		res.status(201).json('ok');
	} catch (e) {
		res.status(500).json('Something went wrong');
	}
};

export const deactivateUser = async (req: Request, res: Response) => {
	const { id } = req.params;
	const { email, username } = req.body;

	try {
		await UserSchema.updateOne({  _id: id  }, { isActive: false });
		await sendMail(email, 'ACCOUNT_DELETED', { username });

		res.status(204).json('ok');
	} catch (e) {
		res.status(500).json('Something went wrong');
	}
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

export const forgotPassword = async (req: Request, res: Response) => {
	const { username } = req.params;
	const { email } = req.body;

	try {
		const cipherEmail = await cipheredText(email);
		await sendMail(email, 'REFRESH_PASSWORD', { username, verifyLink: `${WEB}/refresh-password/${cipherEmail}` });
	
		res.status(200).json('Email was sent');
	} catch (e) {
		res.status(500).json('Something went wrong');
	}
};

export const refreshPassword = async (req: Request, res: Response) => {
	const { password, email } = req.body;
	
	const hashedPassword = await hasher(password);
	await UserSchema.updateOne({ email }, { password: hashedPassword });
	
	res.status(201).json('ok');
};
