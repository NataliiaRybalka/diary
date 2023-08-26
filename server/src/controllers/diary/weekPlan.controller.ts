import { Request, Response } from 'express';

import { getWeekDays } from '../../lib/getDates';
import DayPlanSchema from '../../db/diary/dayPlan.schema';

export const postDayPlan = async (req: Request, res: Response) => {
	const { userId } = req.params;
	const { date, plans } = req.body;

	try {		
		const dayPlan = await DayPlanSchema.create({ date, plans: plans[0], userId });
		return res.status(201).json(dayPlan);
	} catch (e) {
		return res.status(400).json(e);
	}
};

export const getWeekPlan = async (req: Request, res: Response) => {
	const { firstDate, userId } = req.params;

	try {
		const week = await getWeekDays(firstDate);

		const promises = [];
		for (const day of week) {
			promises.push(DayPlanSchema.findOne({ 
				userId,
				date: day
			}));
		}
		const dayPlans = await Promise.all(promises);
		res.status(200).json(dayPlans);
	} catch (e) {
		res.status(404).json('Not found');
	}
};

export const putWeekPlan = async (req: Request, res: Response) => {
	const { id } = req.params;
	const { plans } = req.body;

	try {
		await DayPlanSchema.updateOne({ _id: id }, { plans });
		const dayPlan = await DayPlanSchema.findById(id);
		
		return res.status(201).json(dayPlan);
	} catch (e) {
		res.status(400).json(e);
	}
};
