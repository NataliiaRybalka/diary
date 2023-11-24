"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.putPage = exports.getPage = exports.postPage = void 0;
const page_schema_1 = __importDefault(require("../../db/diary/page.schema"));
const postPage = async (req, res) => {
    const { date, userId } = req.params;
    const { pageData } = req.body;
    try {
        const month = `${date.split('-')[0]}-${date.split('-')[1]}`;
        const page = await page_schema_1.default.create({ date, month, ...pageData, userId });
        res.status(201).json(page);
    }
    catch (e) {
        return res.status(400).json(e);
    }
};
exports.postPage = postPage;
const getPage = async (req, res) => {
    const { date, userId } = req.params;
    try {
        const page = await page_schema_1.default.findOne({ date, userId });
        res.status(200).json(page);
    }
    catch (e) {
        res.status(404).json('Not found');
    }
};
exports.getPage = getPage;
const putPage = async (req, res) => {
    const { id } = req.params;
    const { pageData } = req.body;
    try {
        await page_schema_1.default.updateOne({ _id: id }, { ...pageData });
        const page = await page_schema_1.default.findById(id);
        return res.status(201).json(page);
    }
    catch (e) {
        res.status(400).json(e);
    }
};
exports.putPage = putPage;
