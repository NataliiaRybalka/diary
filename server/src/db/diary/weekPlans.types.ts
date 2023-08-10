export interface IPlan {
	plan: string;
	time: Date;
}

export interface IWeekPlans {
	date: String;
	plans: Array<IPlan>;
}