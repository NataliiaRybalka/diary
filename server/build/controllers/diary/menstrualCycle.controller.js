"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.putMenstrualCycle = exports.getMenstrualCycle = exports.postMenstrualCycle = void 0;
const menstrualCycle_schema_1 = __importDefault(require("../../db/diary/menstrualCycle.schema"));
const postMenstrualCycle = async (req, res) => {
    const { userId } = req.params;
    const { tableData } = req.body;
    try {
        const table = await menstrualCycle_schema_1.default.create({ ...tableData, userId });
        res.status(201).json(table);
    }
    catch (e) {
        return res.status(400).json(e);
    }
};
exports.postMenstrualCycle = postMenstrualCycle;
const getMenstrualCycle = async (req, res) => {
    const { userId } = req.params;
    try {
        const table = await menstrualCycle_schema_1.default.find({ userId }).sort([['month', -1]]);
        res.status(200).json(table);
    }
    catch (e) {
        return res.status(404).json('Not found');
    }
};
exports.getMenstrualCycle = getMenstrualCycle;
const putMenstrualCycle = async (req, res) => {
    const { id } = req.params;
    const { tableData } = req.body;
    try {
        await menstrualCycle_schema_1.default.updateOne({ _id: id }, { ...tableData });
        const table = await menstrualCycle_schema_1.default.findById(id);
        return res.status(201).json(table);
    }
    catch (e) {
        res.status(400).json(e);
    }
};
exports.putMenstrualCycle = putMenstrualCycle;
