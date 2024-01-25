"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.job = void 0;
const cron_1 = require("cron");
const fs_1 = __importDefault(require("fs"));
const util_1 = __importDefault(require("util"));
const push_1 = require("../lib/push");
const notification_schema_1 = __importDefault(require("../db/notification/notification.schema"));
const mail_1 = require("../lib/mail");
const constants_1 = require("../lib/constants");
const outputLog = fs_1.default.createWriteStream(__dirname + '/../logger.log', { flags: 'w' });
exports.job = new cron_1.CronJob('*/10 * * * *', async () => {
    const currentDateTimeUTC = JSON.parse(JSON.stringify(new Date()));
    const currentDateTimeUTCArr = currentDateTimeUTC.split('T');
    let currentTimeUTC = currentDateTimeUTCArr[1];
    const currentTimeUTCArr = currentTimeUTC.split('.');
    currentTimeUTC = currentTimeUTCArr[0];
    try {
        let taskDate = new Date().toLocaleDateString();
		let startTime = new Date().toLocaleTimeString('ru');
        const timeArr = startTime.split(':');
        timeArr[1] = Number(timeArr[1]);
        if ((timeArr[1] - 10) >= 0) {
			timeArr[1] = timeArr[1] - 10;
			timeArr[1] = String(timeArr[1]).length === 1 ? `0${timeArr[1]}` : timeArr[1];
		}
		else {
			if ((timeArr[0] - 1) >= 0) {
				timeArr[0] = timeArr[0] - 1;
				timeArr[1] = 60 + (timeArr[1] - 10);
				timeArr[1] = String(timeArr[1]).length === 1 ? `0${timeArr[1]}` : timeArr[1];
			} else {
				let taskDateArr = taskDate.split('/') as string[];
				taskDateArr[1] = String(Number(taskDateArr[1]) - 1);
				taskDate = taskDateArr.join('/');

				timeArr[0] = timeArr[0] - 1;
				timeArr[1] = 60 + (timeArr[1] - 10);
				timeArr[1] = String(timeArr[1]).length === 1 ? `0${timeArr[1]}` : timeArr[1];
			}
		}
		timeArr[0] = timeArr[0][0] === '0' ? timeArr[0][1] : timeArr[0];
		startTime = `${timeArr[0]}:${timeArr[1]}`;
        let endTime = currentTimeUTC;
        let endTime = new Date().toLocaleTimeString('ru');
		const endTimeArr = endTime.split(':') as any[];
		endTimeArr[0] = endTimeArr[0][0] === '0' ? endTimeArr[0][1] : endTimeArr[0];
		endTime = `${endTimeArr[0]}:${endTimeArr[1]}`;
        let notifications = await notification_schema_1.default.find({
            isSent: false,
            needToSend: true,
            $or: [
                {
                    time: {
                        $gt: startTime,
                        $lt: endTime,
                    }
                },
                {
                    time: startTime
                }
            ]
        });
        notifications = notifications.filter(notif => notif.date === taskDate || notif.date === 'everyday');
        const promises = [];
        for (const notification of notifications) {
            if (notification.type === 'morning' || notification.type === 'evening') {
                promises.push((0, mail_1.sendMail)(notification.userData.email, notification.type, { username: notification.userData.username, link: `${constants_1.WEB}/my-diary/diary` }, notification.language));
                promises.push((0, push_1.handlePushTokens)({
                    type: notification.type,
                    token: notification.userData.deviceToken,
                    language: notification.language,
                }));
            }
            else {
                promises.push((0, mail_1.sendMail)(notification.userData.email, notification.type, { username: notification.userData.username, task: notification.task, time: notification.taskTime }, notification.language));
                promises.push((0, push_1.handlePushTokens)({
                    type: notification.type,
                    taskData: {
                        time: notification.taskTime,
                        task: notification.task,
                    },
                    token: notification.userData.deviceToken,
                    language: notification.language,
                }));
                promises.push(notification_schema_1.default.updateOne({ _id: notification._id }, { isSent: true }));
            }
        }
        await Promise.all(promises);
    }
    catch (e) {
        console.log(e);
    }
});
