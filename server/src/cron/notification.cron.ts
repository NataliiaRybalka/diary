import { CronJob } from 'cron';

export const job = new CronJob('* * * * * *', function() {
	const d = new Date();
	console.log('Every second:', d);
});
