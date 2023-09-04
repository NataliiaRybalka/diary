import { Request, Response } from 'express';

import UserSchema from '../../db/user/user.schema';
import PageSchema from '../../db/diary/page.schema';

export const getMonthResults = async (req: Request, res: Response) => {
	const { userId, month } = req.params;

	try {
		const user = await UserSchema.findById(userId).select('pages').populate({
			path: 'pages',
			select: ['date', 'menstrualDay', 'totalHours', 'physicalActivity', 'drankWater'],
			match: { date: { $regex: month } },
			options: { sort: { 'date': 1 } }
		});
		if (!user) return res.status(404).json('Not found');
		const result = await PageSchema.aggregate([
			{
				$match: {
					userId,
					date: { $regex: month }
				}
			},
		]);

		res.status(200).json(result);
	} catch (e) {
		res.status(404).json('Not found');
	}
};

export const getTotalResults = async (req: Request, res: Response) => {
	const { userId } = req.params;

	try {
		const result = await PageSchema.aggregate([
			{$match: { userId }},
			{$group: {
				_id: "$month",
				totalHours: {$avg: '$totalHours'},
				physicalActivity: {$avg: '$physicalActivity'},
			}}
		]);
		res.status(200).json(result);
	} catch (e) {
		res.status(404).json('Not found');
	}
};
