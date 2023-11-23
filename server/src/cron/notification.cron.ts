import { CronJob } from 'cron';

import { handlePushTokens } from '../lib/push';
import NotificationSchema from '../db/notification/notification.schema';
import { sendMail } from '../lib/mail';
import { WEB } from '../lib/constants';

export const job = new CronJob('*/10 * * * *', async () => {
	try {
		let taskDate = new Date().toLocaleDateString();
		let startTime = new Date().toLocaleTimeString('ru');
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

		let endTime = new Date().toLocaleTimeString('ru');
		const endTimeArr = endTime.split(':') as any[];
		endTimeArr[0] = endTimeArr[0][0] === '0' ? endTimeArr[0][1] : endTimeArr[0];
		endTime = `${endTimeArr[0]}:${endTimeArr[1]}`;
console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', {startTime, endTime});

		const notifications = await NotificationSchema.find({
			isSent: false,
			needToSend: true,
			time: {
				$gt: startTime,
				$lt: endTime,
			},
			$or: [
				{ date: taskDate },
				{ date: 'everyday' },
			]
		});

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
