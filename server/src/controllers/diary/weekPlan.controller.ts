import { Request, Response } from 'express';

import { getWeekDays } from '../../lib/getDates';
import DayPlanSchema from '../../db/diary/dayPlan.schema';
import UserSchema from '../../db/user/user.schema';

export const postDayPlan = async (req: Request, res: Response) => {
	const { userId } = req.params;
	const { date, plans } = req.body;

	try {
		const userWithDayPlan = await UserSchema.findById(userId).select('dayPlans').populate({
			path: 'dayPlans',
			match: { date }
		});
		if (userWithDayPlan && userWithDayPlan?.dayPlans.length) return res.status(403).json('This day already exists');
		
		const dayPlan = await DayPlanSchema.create({ date, plans: plans[0] });

		const user = await UserSchema.findById(userId);
		if (!user) return res.status(404).json('Not found');
		user.dayPlans.push(dayPlan);
		await user.save();
		
		return res.status(201).json(dayPlan);
	} catch (e) {
		return res.status(400).json(e);
	}
};

export const getWeekPlan = async (req: Request, res: Response) => {
	const { firstDate, userId } = req.params;

	try {
		const week = await getWeekDays(firstDate);

		const user = await UserSchema.findById(userId).select('dayPlans').populate({
			path: 'dayPlans',
			match: { date: week }
		});
		if (!user) return res.status(404).json('Not found');

		res.status(200).json(user.dayPlans);
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
