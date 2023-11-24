"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTotalResults = exports.getMonthResults = void 0;
const page_schema_1 = __importDefault(require("../../db/diary/page.schema"));
const getMonthResults = async (req, res) => {
    const { userId, month } = req.params;
    try {
        const result = await page_schema_1.default
            .find({ userId, date: { $regex: month } })
            .select(['date', 'menstrualDay', 'totalHours', 'physicalActivity', 'drankWater'])
            .sort({ 'date': 'asc' });
        res.status(200).json(result);
    }
    catch (e) {
        res.status(404).json('Not found');
    }
};
exports.getMonthResults = getMonthResults;
const getTotalResults = async (req, res) => {
    const { userId } = req.params;
    try {
        const result = await page_schema_1.default.aggregate([
            { $match: { userId } },
            { $group: {
                    _id: "$month",
                    totalHours: { $avg: '$totalHours' },
                    physicalActivity: { $avg: '$physicalActivity' },
                } }
        ]);
        res.status(200).json(result);
    }
    catch (e) {
        res.status(404).json('Not found');
    }
};
exports.getTotalResults = getTotalResults;
