"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.putWeekPlan = exports.getWeekPlan = exports.postDayPlan = void 0;
const getDates_1 = require("../../lib/getDates");
const dayPlan_schema_1 = __importDefault(require("../../db/diary/dayPlan.schema"));
const notification_types_1 = require("../../db/notification/notification.types");
const notification_schema_1 = __importDefault(require("../../db/notification/notification.schema"));
const user_schema_1 = __importDefault(require("../../db/user/user.schema"));
const postDayPlan = async (req, res) => {
    const { userId } = req.params;
    const { date, plans, timezone, language } = req.body;
    try {
        const dayPlan = await dayPlan_schema_1.default.create({ date, plans: plans, userId });
        // @ts-ignore
        const { dayPlanNotification, email, username, deviceToken } = await user_schema_1.default
            .findOne({ _id: userId })
            .select(['dayPlanNotification', 'email', 'username', 'deviceToken']);
        if (dayPlanNotification) {
            const promises = [];
            for (const plan of dayPlan.plans) {
                if (!plan.plan || plan.time === '00:00' || plan.time === '')
                    continue;
                let taskDate = new Date(date).toLocaleDateString();
                const timeForSend = plan.time.split(':');
                timeForSend[0] = Number(timeForSend[0]);
                if ((timeForSend[0] - 1 + timezone) >= 0)
                    timeForSend[0] = timeForSend[0] - 1 + timezone;
                else {
                    let taskDateArr = taskDate.split('/');
                    taskDateArr[1] = String(Number(taskDateArr[1]) - 1);
                    taskDate = taskDateArr.join('/');
                    timeForSend[0] = 24 + (timeForSend[0] - 1 + timezone);
                }
                promises.push(notification_schema_1.default.create({ userId, userData: {
                        email,
                        username,
                        deviceToken,
                    }, date: taskDate, time: timeForSend.join(':'), type: notification_types_1.NotificationTypesEnum.DAY_PLAN, task: plan.plan, taskTime: plan.time, language }));
            }
            await Promise.all(promises);
        }
        return res.status(201).json(dayPlan);
    }
    catch (e) {
        return res.status(400).json(e);
    }
};
exports.postDayPlan = postDayPlan;
const getWeekPlan = async (req, res) => {
    const { firstDate, userId } = req.params;
    try {
        const week = await (0, getDates_1.getWeekDays)(firstDate);
        const promises = [];
        for (const day of week) {
            promises.push(dayPlan_schema_1.default.findOne({
                userId,
                date: day
            }));
        }
        const dayPlans = await Promise.all(promises);
        res.status(200).json(dayPlans);
    }
    catch (e) {
        res.status(404).json('Not found');
    }
};
exports.getWeekPlan = getWeekPlan;
const putWeekPlan = async (req, res) => {
    const { id } = req.params;
    const { plans, timezone, user, language } = req.body;
    const parsedUser = JSON.parse(user);
    try {
        await dayPlan_schema_1.default.updateOne({ _id: id }, { plans });
        const dayPlan = await dayPlan_schema_1.default.findById(id);
        if (!dayPlan)
            return res.status(404).json('Not found');
        let promises = [];
        for (const plan of dayPlan.plans) {
            if (!plan.plan || plan.time === '00:00' || plan.time === '')
                continue;
            let taskDate = new Date(dayPlan.date).toLocaleDateString();
            const timeForSend = plan.time.split(':');
            timeForSend[0] = Number(timeForSend[0]);
            if ((timeForSend[0] - 1 + timezone) >= 0)
                timeForSend[0] = timeForSend[0] - 1 + timezone;
            else {
                let taskDateArr = taskDate.split('/');
                taskDateArr[1] = String(Number(taskDateArr[1]) - 1);
                taskDate = taskDateArr.join('/');
                timeForSend[0] = 24 + (timeForSend[0] - 1 + timezone);
            }
            promises.push(notification_schema_1.default.deleteMany({ userId: dayPlan.userId, type: notification_types_1.NotificationTypesEnum.DAY_PLAN, date: taskDate }));
        }
        // @ts-ignore
        const { deviceToken } = await user_schema_1.default.findById({ _id: parsedUser.id }).select('deviceToken');
        await Promise.all(promises);
        promises = [];
        for (const plan of dayPlan.plans) {
            if (!plan.plan || plan.time === '00:00' || plan.time === '')
                continue;
            let taskDate = new Date(dayPlan.date).toLocaleDateString();
            const timeForSend = plan.time.split(':');
            timeForSend[0] = Number(timeForSend[0]);
            if ((timeForSend[0] - 1 + timezone) >= 0)
                timeForSend[0] = timeForSend[0] - 1 + timezone;
            else {
                let taskDateArr = taskDate.split('/');
                taskDateArr[1] = String(Number(taskDateArr[1]) - 1);
                taskDate = taskDateArr.join('/');
                timeForSend[0] = 24 + (timeForSend[0] - 1 + timezone);
            }
            promises.push(notification_schema_1.default.create({ userId: dayPlan.userId, userData: {
                    email: parsedUser.email,
                    username: parsedUser.username,
                    deviceToken,
                }, date: taskDate, time: timeForSend.join(':'), type: notification_types_1.NotificationTypesEnum.DAY_PLAN, task: plan.plan, taskTime: plan.time, language
            }));
        }
        await Promise.all(promises);
        return res.status(201).json(dayPlan);
    }
    catch (e) {
        res.status(400).json(e);
    }
};
exports.putWeekPlan = putWeekPlan;
