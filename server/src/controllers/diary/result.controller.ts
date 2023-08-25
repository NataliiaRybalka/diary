import { Request, Response } from 'express';

import UserSchema from '../../db/user/user.schema';

export const getMonthResults = async (req: Request, res: Response) => {
	const { userId, month } = req.params;

	try {
		const user = await UserSchema.findById(userId).select('pages').populate({
			path: 'pages',
			select: ['date', 'happiness', 'menstrualDay', 'selfCare', 'meditation', 'totalHours', 'physicalActivity', 'drankWater'],
			match: {date: {$regex :month}},
		});
		if (!user) return res.status(404).json('Not found');

		res.status(200).json(user.pages);
	} catch (e) {
		res.status(404).json('Not found');
	}
};