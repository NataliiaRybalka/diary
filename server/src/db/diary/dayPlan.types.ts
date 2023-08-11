import { IPlan } from "./plan.types";

export interface IDayPlan {
	date: String;
	plans: Array<IPlan>;
}