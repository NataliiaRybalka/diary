import {
    getMenstrualCycle,
    postMenstrualCycle,
    putMenstrualCycle,
} from "./menstrualCycle.controller";
import { getMonthResults, getTotalResults } from "./result.controller";
import { getPage, postPage, putPage } from "./page.controller";
import { getWeekPlan, postDayPlan, putWeekPlan } from "./weekPlan.controller";

export default {
    getMenstrualCycle,
    getMonthResults,
    getPage,
    getTotalResults,
    getWeekPlan,
    postDayPlan,
    postMenstrualCycle,
    postPage,
    putPage,
    putWeekPlan,
    putMenstrualCycle,
};
