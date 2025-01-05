import { LanguageEnum } from "db/user/user.types";

export enum NotificationTypesEnum {
    MORNING = "morning",
    EVENING = "evening",
    DAY_PLAN = "day_plan",
}

interface IUser {
    email: string;
    username: string;
    deviceToken: string;
}

export interface INotification {
    userId: string;
    userData: IUser;
    date: string;
    time: string;
    type: NotificationTypesEnum;
    needToSend: boolean;
    isSent: boolean;
    task: string;
    taskTime: string;
    language: LanguageEnum;
}
