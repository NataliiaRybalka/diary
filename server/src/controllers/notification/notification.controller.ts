import { Request, Response } from "express";

import { NotificationTypesEnum } from "../../db/notification/notification.types";
import NotificationSchema from "../../db/notification/notification.schema";
import UserSchema from "../../db/user/user.schema";

export const getNotification = async (req: Request, res: Response) => {
    const { userId } = req.params;

    try {
        // @ts-ignore
        const { dayPlanNotification } = await UserSchema.findOne({
            _id: userId,
        }).select("dayPlanNotification");
        const notifications = await NotificationSchema.find({
            userId,
            $or: [
                { type: NotificationTypesEnum.MORNING },
                { type: NotificationTypesEnum.EVENING },
            ],
        });

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
            };
        }

        res.status(200).json(settings);
    } catch (e) {
        return res.status(400).json(e);
    }
};

export const putNotification = async (req: Request, res: Response) => {
    const { userId } = req.params;
    const { notifications, timezone } = req.body;

    try {
        let morningTime = notifications.morning.time;
        morningTime = morningTime.split(":");
        morningTime[0] = Number(morningTime[0]) + timezone;
        morningTime = morningTime.join(":");
        let eveningTime = notifications.evening.time;
        eveningTime = eveningTime.split(":");
        eveningTime[0] = Number(eveningTime[0]) + timezone;
        eveningTime = eveningTime.join(":");

        await Promise.all([
            NotificationSchema.updateMany(
                { userId, type: NotificationTypesEnum.MORNING },
                {
                    time: morningTime,
                    needToSend: notifications.morning.send,
                    language: notifications.morning.language,
                }
            ),
            NotificationSchema.updateMany(
                { userId, type: NotificationTypesEnum.EVENING },
                {
                    time: eveningTime,
                    needToSend: notifications.evening.send,
                    language: notifications.evening.language,
                }
            ),
            UserSchema.updateOne(
                { _id: userId },
                { dayPlanNotification: notifications.day_plan.send }
            ),
        ]);

        res.status(201).json("ok");
    } catch (e) {
        return res.status(400).json(e);
    }
};
