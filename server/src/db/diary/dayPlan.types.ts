import { IPlan } from "./plan.types";

export interface IDayPlan {
    userId: string;
    date: string;
    plans: Array<IPlan>;
}
