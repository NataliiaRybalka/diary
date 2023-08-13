import { Request, Response } from 'express';

export const postMenstrualCycle = async (req: Request, res: Response) => {
	const { data, user_id } = req.body;
	try {
		res.status(201).json('page');
	} catch (e) {
		return res.status(400).json(e);
	}
};
