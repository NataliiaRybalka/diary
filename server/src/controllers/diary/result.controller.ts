import { Request, Response } from 'express';

import PageSchema from '../../db/diary/page.schema';

export const getMonthResults = async (req: Request, res: Response) => {
	const { userId, month } = req.params;

	try {
		const result = await PageSchema
		.find({ userId, date: { $regex: month } })
		.select(['date', 'menstrualDay', 'totalHours', 'physicalActivity', 'drankWater'])
		.sort({ 'date': 'asc' });
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
