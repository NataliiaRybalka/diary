import { Request, Response } from 'express';

import { IPage } from '../../db/diary/page.types';
import PageSchema from '../../db/diary/page';

export const postPage = async (req: Request, res: Response) => {
	const { date } = req.params;
	const { data } = req.body;

	try {
		const savedData = await PageSchema.create({ date, data });
		res.status(201).json(savedData);
	} catch (e) {
		return res.status(400).json(e);
	}
};
