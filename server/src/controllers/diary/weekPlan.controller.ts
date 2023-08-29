import { Request, Response } from 'express';

import { getWeekDays } from '../../lib/getDates';
import DayPlanSchema from '../../db/diary/dayPlan.schema';
import { NotificationTypesEnum } from '../../db/notification/notification.types';
import NotificationSchema from '../../db/notification/notification.schema';
import UserSchema from '../../db/user/user.schema';

export const postDayPlan = async (req: Request, res: Response) => {
	const { userId } = req.params;
	const { date, plans, timezone } = req.body;

	try {
		const dayPlan = await DayPlanSchema.create({ date, plans: plans[0], userId });
		// @ts-ignore
		const { dayPlanNotification } = await UserSchema.findOne({ _id: userId }).select('dayPlanNotification');

		if (dayPlanNotification) {
			const promises = [];
			for (const plan of dayPlan.plans) {
				let taskDate = new Date(date).toLocaleDateString();				
				const timeForSend = plan.time.split(':') as any[];
				timeForSend[0] = Number(timeForSend[0]);
				if ((timeForSend[0] - 1 + timezone) >= 0) timeForSend[0] = timeForSend[0] - 1 + timezone;
				else {
					let taskDateArr = taskDate.split('/') as string[];
					taskDateArr[1] = String(Number(taskDateArr[1]) - 1);
					taskDate = taskDateArr.join('/');

					timeForSend[0] = 24 + (timeForSend[0] - 1 + timezone);
				}

				promises.push(NotificationSchema.create(
					{ userId, date: taskDate, time: timeForSend.join(':'), type: NotificationTypesEnum.DAY_PLAN, task: plan.plan, taskTime: plan.time }
				));
			}
			await Promise.all(promises);
		}
		
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
	const { plans, timezone } = req.body;

	try {
		await DayPlanSchema.updateOne({ _id: id }, { plans });
		const dayPlan = await DayPlanSchema.findById(id);
		if (!dayPlan) return res.status(404).json('Not found');

		let promises = [];
		for (const plan of dayPlan.plans) {
			let taskDate = new Date(dayPlan.date).toLocaleDateString();				
			const timeForSend = plan.time.split(':') as any[];
			timeForSend[0] = Number(timeForSend[0]);
			if ((timeForSend[0] - 1 + timezone) >= 0) timeForSend[0] = timeForSend[0] - 1 + timezone;
			else {
				let taskDateArr = taskDate.split('/') as string[];
				taskDateArr[1] = String(Number(taskDateArr[1]) - 1);
				taskDate = taskDateArr.join('/');

				timeForSend[0] = 24 + (timeForSend[0] - 1 + timezone);
			}
			promises.push(
				NotificationSchema.deleteMany({ userId: dayPlan.userId, type: NotificationTypesEnum.DAY_PLAN, date: taskDate })
			);
		}
		await Promise.all(promises);
		promises = [];
		for (const plan of dayPlan.plans) {
			let taskDate = new Date(dayPlan.date).toLocaleDateString();				
			const timeForSend = plan.time.split(':') as any[];
			timeForSend[0] = Number(timeForSend[0]);
			if ((timeForSend[0] - 1 + timezone) >= 0) timeForSend[0] = timeForSend[0] - 1 + timezone;
			else {
				let taskDateArr = taskDate.split('/') as string[];
				taskDateArr[1] = String(Number(taskDateArr[1]) - 1);
				taskDate = taskDateArr.join('/');

				timeForSend[0] = 24 + (timeForSend[0] - 1 + timezone);
			}
			promises.push(NotificationSchema.create(
				{ userId: dayPlan.userId, date: taskDate, time: timeForSend.join(':'), type: NotificationTypesEnum.DAY_PLAN, task: plan.plan, taskTime: plan.time }
			));
		}
		await Promise.all(promises);
		
		return res.status(201).json(dayPlan);
	} catch (e) {
		res.status(400).json(e);
	}
};
