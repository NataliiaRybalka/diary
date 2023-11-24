"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.putNotification = exports.getNotification = void 0;
const notification_types_1 = require("../../db/notification/notification.types");
const notification_schema_1 = __importDefault(require("../../db/notification/notification.schema"));
const user_schema_1 = __importDefault(require("../../db/user/user.schema"));
const getNotification = async (req, res) => {
    const { userId } = req.params;
    try {
        // @ts-ignore
        const { dayPlanNotification } = await user_schema_1.default.findOne({ _id: userId }).select('dayPlanNotification');
        const notifications = await notification_schema_1.default.find({ userId, $or: [
                { type: notification_types_1.NotificationTypesEnum.MORNING },
                { type: notification_types_1.NotificationTypesEnum.EVENING },
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
            };
        }
        res.status(200).json(settings);
    }
    catch (e) {
        return res.status(400).json(e);
    }
};
exports.getNotification = getNotification;
const putNotification = async (req, res) => {
    const { userId } = req.params;
    const { notifications, timezone } = req.body;
    try {
        let morningTime = notifications.morning.time;
        morningTime = morningTime.split(':');
        morningTime[0] = Number(morningTime[0]) + timezone;
        morningTime = morningTime.join(':');
        let eveningTime = notifications.evening.time;
        eveningTime = eveningTime.split(':');
        eveningTime[0] = Number(eveningTime[0]) + timezone;
        eveningTime = eveningTime.join(':');
        await Promise.all([
            notification_schema_1.default.updateMany({ userId, type: notification_types_1.NotificationTypesEnum.MORNING }, { time: morningTime, needToSend: notifications.morning.send, language: notifications.morning.language }),
            notification_schema_1.default.updateMany({ userId, type: notification_types_1.NotificationTypesEnum.EVENING }, { time: eveningTime, needToSend: notifications.evening.send, language: notifications.evening.language }),
            user_schema_1.default.updateOne({ _id: userId }, { dayPlanNotification: notifications.day_plan.send }),
        ]);
        res.status(201).json('ok');
    }
    catch (e) {
        return res.status(400).json(e);
    }
};
exports.putNotification = putNotification;
