"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const menstrualCycle_controller_1 = require("./menstrualCycle.controller");
const result_controller_1 = require("./result.controller");
const page_controller_1 = require("./page.controller");
const weekPlan_controller_1 = require("./weekPlan.controller");
exports.default = {
    getMenstrualCycle: menstrualCycle_controller_1.getMenstrualCycle,
    getMonthResults: result_controller_1.getMonthResults,
    getPage: page_controller_1.getPage,
    getTotalResults: result_controller_1.getTotalResults,
    getWeekPlan: weekPlan_controller_1.getWeekPlan,
    postDayPlan: weekPlan_controller_1.postDayPlan,
    postMenstrualCycle: menstrualCycle_controller_1.postMenstrualCycle,
    postPage: page_controller_1.postPage,
    putPage: page_controller_1.putPage,
    putWeekPlan: weekPlan_controller_1.putWeekPlan,
    putMenstrualCycle: menstrualCycle_controller_1.putMenstrualCycle,
};
