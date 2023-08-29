import { Request, Response } from 'express';

import { NotificationTypesEnum } from '../../db/notification/notification.types';
import NotificationSchema from '../../db/notification/notification.schema';
import UserSchema from '../../db/user/user.schema';

export const putNotification = async (req: Request, res: Response) => {
	const { userId } = req.params;
	const notifications = req.body;

	try {
		await Promise.all([
			NotificationSchema.updateMany(
				{ userId, type: NotificationTypesEnum.MORNING },
				{ time: notifications.morning.time, needToSend: notifications.morning.send }
			),
			NotificationSchema.updateMany(
				{ userId, type: NotificationTypesEnum.EVENING },
				{ time: notifications.evening.time, needToSend: notifications.evening.send }
			),
			UserSchema.updateOne({ _id: userId }, { dayPlanNotification: notifications.day_plan }),
		]);

		res.status(201).json('ok');
	} catch (e) {
		return res.status(400).json(e);
	}
};
