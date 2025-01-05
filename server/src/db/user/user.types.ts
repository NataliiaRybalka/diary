import { IDayPlan } from "db/diary/dayPlan.types";
import { IPage } from "db/diary/page.types";

export enum LanguageEnum {
    EN = "en",
    RU = "ru",
    UA = "ua",
}

export interface IUser {
    email: string;
    username: string;
    password: string;
    isActive: boolean;
    language: LanguageEnum;
    dayPlans: Array<IDayPlan>;
    pages: Array<IPage>;
    dayPlanNotification: boolean;
    deviceToken: string;
}
