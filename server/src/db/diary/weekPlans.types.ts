enum Week {
	Mon = 'Monday',
	Tues = 'Tuesday',
	Wed = 'Wednesday',
	Thurs = 'Thursday',
	Fri = 'Friday',
	Sat = 'Saturday',
	Sun = 'Sunday',
}

export interface IPlan {
	plan: string;
	type: Date;
}

export interface IWeekPlans {
	weekDay: Week;
	date: Date;
	plans: Array<IPlan>;
}