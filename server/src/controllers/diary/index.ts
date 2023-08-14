import {
	getMenstrualCycle,
	postMenstrualCycle,
} from './menstrualCycle.controller';
import {
	getPage,
	postPage,
	putPage,
} from './page.controller';
import {
	getWeekPlan,
	postDayPlan,
	putWeekPlan,
} from './weekPlan.controller';

export default {
	getMenstrualCycle,
	getPage,
	getWeekPlan,
	postDayPlan,
	postMenstrualCycle,
	postPage,
	putPage,
	putWeekPlan,
};
