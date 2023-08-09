import { Request, Response } from 'express';

import { IPlan } from 'db/diary/weekPlans.types';
import { IWeekPlans } from 'db/diary/weekPlans.types';
import WeekPlansSchema from '../../db/diary/weekPlans';

export const saveDayPlan = async (req: Request, res: Response) => {
	const { date, plans, user } = req.body;

	try {
		const dayPlan = await WeekPlansSchema.create({ date, plans, user }) as IWeekPlans;

		return res.status(201).json(dayPlan);
	} catch (e) {
		return res.status(400).json(e);
	}
};
