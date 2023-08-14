import { Request, Response } from 'express';

import MenstrualCycleSchema from '../../db/diary/menstrualCycle.schema';
import UserSchema from '../../db/user/user.schema';

export const postMenstrualCycle = async (req: Request, res: Response) => {
	const { userId } = req.params;
	const { data } = req.body;

	try {
		const user = await UserSchema.findById(userId);
		if (!user) return res.status(404).json('Not found');

		const table = await MenstrualCycleSchema.create({ data, user });
		res.status(201).json(table);
	} catch (e) {
		return res.status(400).json(e);
	}
};
