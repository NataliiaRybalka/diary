import { Request, Response } from 'express';

import UserSchema from '../../db/user/user.schema';
import PageSchema from '../../db/diary/page.schema';

export const getMonthResults = async (req: Request, res: Response) => {
	const { userId, month } = req.params;

	try {
		const user = await UserSchema.findById(userId).select('pages').populate({
			path: 'pages',
			select: ['date', 'happiness', 'menstrualDay', 'selfCare', 'meditation', 'totalHours', 'physicalActivity', 'drankWater'],
			match: { date: { $regex: month } },
			options: { sort: { 'date': 1 } }
		});
		if (!user) return res.status(404).json('Not found');
		const resa = await PageSchema.aggregate([
			{
				$match: {
					userId,
					date: { $regex: month }
				}
			},
		]);

		res.status(200).json(resa);
	} catch (e) {
		res.status(404).json('Not found');
	}
};

export const getTotalResults = async (req: Request, res: Response) => {
	const { userId } = req.params;

	try {
		const user = await UserSchema.findById(userId).select('pages').populate({
			path: 'pages',
			select: ['date', 'happiness', 'totalHours', 'physicalActivity'],
		});
		if (!user) return res.status(404).json('Not found');

		try {
			const a = await PageSchema.aggregate([
				{$match: { user: userId }},
				{$group: {
					_id: "$month",
					hap: {$avg: '$happiness'}
				}}
			])

			console.log(a);
			
		} catch (e) {
			console.log('aaaaaaaaa', e);
			
		}

		res.status(200).json('sortedPages');
	} catch (e) {
		res.status(404).json('Not found');
	}
};
