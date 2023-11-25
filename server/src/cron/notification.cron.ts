import { CronJob } from 'cron';
import fs from 'fs';
import util from 'util';

import { handlePushTokens } from '../lib/push';
import NotificationSchema from '../db/notification/notification.schema';
import { sendMail } from '../lib/mail';
import { WEB } from '../lib/constants';

const outputLog = fs.createWriteStream(__dirname + '/../logger.log', {flags : 'w'});

export const job = new CronJob('*/10 * * * *', async () => {
	const currentDateTimeUTC = JSON.parse(JSON.stringify(new Date()));
	const currentDateTimeUTCArr = currentDateTimeUTC.split('T');
	let currentTimeUTC = currentDateTimeUTCArr[1];
	const currentTimeUTCArr = currentTimeUTC.split('.');
	currentTimeUTC = currentTimeUTCArr[0];

	try {
		let taskDate = new Date().toLocaleDateString();
		let startTime = currentTimeUTC;

		const timeArr = startTime.split(':') as any[];
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
		const endTimeArr = endTime.split(':') as any[];
		endTimeArr[0] = endTimeArr[0][0] === '0' ? endTimeArr[0][1] : endTimeArr[0];
		endTime = `${endTimeArr[0]}:${endTimeArr[1]}`;

		outputLog.write(util.format(new Date(), `startTime: ${startTime}, endTime: ${endTime}`) + '\n');

		let notifications = await NotificationSchema.find({
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
				promises.push(sendMail(
					notification.userData.email,
					notification.type,
					{ username: notification.userData.username, link: `${WEB}/my-diary/diary` },
					notification.language,
				));
				promises.push(handlePushTokens({
					type: notification.type,
					token: notification.userData.deviceToken,
					language: notification.language,
				}));
			} else {
				promises.push(sendMail(
					notification.userData.email,
					notification.type,
					{ username: notification.userData.username, task: notification.task, time: notification.taskTime },
					notification.language,
				));
				promises.push(handlePushTokens({
					type: notification.type,
					taskData: {
						time: notification.taskTime,
						task: notification.task,
					},
					token: notification.userData.deviceToken,
					language: notification.language,
				}));
				promises.push(NotificationSchema.updateOne({ _id: notification._id }, { isSent: true }));
			}
		}
		await Promise.all(promises);
	} catch (e) {
		console.log(e);
	}
});
