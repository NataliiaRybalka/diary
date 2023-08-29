export enum NotificationTypesEnum {
	MORNING = 'morning',
	EVENING = 'evening',
	DAY_PLAN = 'day_plan',
}

export interface INotification {
	userId: string;
	date: string;
	time: string;
	type: NotificationTypesEnum;
	needToSend: boolean;
	isSent: boolean;
	task: string;
	taskTime: string;
}