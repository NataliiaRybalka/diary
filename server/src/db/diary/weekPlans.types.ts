export interface IPlan {
	plan: string;
}

export interface IWeekPlans {
	date: String;
	plans: Array<IPlan>;
}