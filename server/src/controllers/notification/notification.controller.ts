import { Request, Response } from 'express';

import { NotificationTypesEnum } from '../../db/notification/notification.types';
import NotificationSchema from '../../db/notification/notification.schema';
import UserSchema from '../../db/user/user.schema';

export const getNotification = async (req: Request, res: Response) => {
	const { userId } = req.params;

	try {
		// @ts-ignore
		const { dayPlanNotification } = await UserSchema.findOne({ _id: userId }).select('dayPlanNotification');
		const notifications = await NotificationSchema.find({ userId, $or:[
			{ type: NotificationTypesEnum.MORNING },
			{ type: NotificationTypesEnum.EVENING },
		] });

		const settings = {
			day_plan: {
				send: dayPlanNotification,
			},
		};
		for (const notification of notifications) {
			// @ts-ignore
			settings[notification.type] = {
				send: notification.needToSend,
				time: notification.time,
				language: notification.language,
			}
		}

		res.status(200).json(settings);
	} catch (e) {
		return res.status(400).json(e);
	}
};

export const putNotification = async (req: Request, res: Response) => {
	const { userId } = req.params;
	const notifications = req.body;

	try {
		await Promise.all([
			NotificationSchema.updateMany(
				{ userId, type: NotificationTypesEnum.MORNING },
				{ time: notifications.morning.time, needToSend: notifications.morning.send, language: notifications.morning.language }
			),
			NotificationSchema.updateMany(
				{ userId, type: NotificationTypesEnum.EVENING },
				{ time: notifications.evening.time, needToSend: notifications.evening.send, language: notifications.evening.language }
			),
			UserSchema.updateOne({ _id: userId }, { dayPlanNotification: notifications.day_plan.send }),
		]);

		res.status(201).json('ok');
	} catch (e) {
		return res.status(400).json(e);
	}
};
