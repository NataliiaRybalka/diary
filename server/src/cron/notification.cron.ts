import { CronJob } from 'cron';

import NotificationSchema from '../db/notification/notification.schema';

// export const job = new CronJob('*/10 * * * *', async () => {
export const job = new CronJob('* * * * * *', async () => {
	try {
		let taskDate = new Date().toLocaleDateString();
		let startTime = new Date().toLocaleTimeString('ru');
		const timeArr = startTime.split(':') as any[];
		timeArr[1] = Number(timeArr[1]);
		if ((timeArr[1] - 10) >= 0) timeArr[1] = timeArr[1] - 10;
		else {
			if ((timeArr[0] - 1) >= 0) {
				timeArr[0] = timeArr[0] - 1;
				timeArr[1] = 60 + (timeArr[1] - 10);
			} else {
				let taskDateArr = taskDate.split('/') as string[];
				taskDateArr[1] = String(Number(taskDateArr[1]) - 1);
				taskDate = taskDateArr.join('/');

				timeArr[0] = timeArr[0] - 1;
				timeArr[1] = 60 + (timeArr[1] - 10);
			}
		}
		startTime = `${timeArr[0]}:${timeArr[1]}`;
		
		const notifications = await NotificationSchema.find({
			isSent: false,
			needToSend: true,
			time: {
				$gt: startTime,
				$lt: new Date().toLocaleTimeString('ru'),
			},
			$or: [
				{ date: taskDate },
				{ date: 'everyday' },
			]
		});
		console.log(notifications);
	} catch (e) {
		console.log(e);
	}
});
