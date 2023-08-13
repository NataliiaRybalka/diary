import { Request, Response } from 'express';

import PageSchema from '../../db/diary/page';
import UserSchema from '../../db/user/user.schema';

export const postPage = async (req: Request, res: Response) => {
	const { date } = req.params;
	const { data, user_id } = req.body;

	try {
		const page = await PageSchema.create({ date, ...data });

		const user = await UserSchema.findById(user_id);
		if (!user) return res.status(404).json('Not found');
		user.pages.push(page);
		await user.save();

		res.status(201).json(page);
	} catch (e) {
		return res.status(400).json(e);
	}
};

export const getPage = async (req: Request, res: Response) => {
	const { date } = req.params;

	try {
		const page = await PageSchema.findOne({ date });
		res.status(200).json(page);
	} catch (e) {
		res.status(404).json('Not found');
	}	
};

export const putPage = async (req: Request, res: Response) => {
	const { id } = req.params;
	const { data } = req.body;

	try {
		await PageSchema.updateOne({ _id: id }, { ...data });
		const page = await PageSchema.findById(id);
		
		return res.status(201).json(page);
	} catch (e) {
		res.status(500).json(e);
	}
};
