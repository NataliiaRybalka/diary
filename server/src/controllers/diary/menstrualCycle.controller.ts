import { Request, Response } from 'express';

import MenstrualCycleSchema from '../../db/diary/menstrualCycle.schema';
import UserSchema from '../../db/user/user.schema';

export const postMenstrualCycle = async (req: Request, res: Response) => {
	const { userId } = req.params;
	const { tableData } = req.body;

	try {
		const table = await MenstrualCycleSchema.create({ ...tableData, userId });
		res.status(201).json(table);
	} catch (e) {
		return res.status(400).json(e);
	}
};

export const getMenstrualCycle = async (req: Request, res: Response) => {
	const { userId } = req.params;

	try {
		const table = await MenstrualCycleSchema.find({ userId });
		res.status(200).json(table);
	} catch (e) {
		console.log(e);
		
		return res.status(404).json('Not found');
	}
};
