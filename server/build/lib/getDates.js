"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWeekDays = void 0;
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
const monthOptions = { year: 'numeric', month: 'long' };
const getWeekDays = (monday) => {
    const week = [];
    const mon = new Date(monday);
    week.push(mon.toLocaleDateString('en', options));
    let i = 1;
    while (i < 7) {
        let newDate = new Date(mon.getTime());
        newDate.setDate(mon.getDate() + i);
        const newDateStr = newDate.toLocaleDateString('en', options);
        week.push(newDateStr);
        i++;
    }
    return week;
};
exports.getWeekDays = getWeekDays;
