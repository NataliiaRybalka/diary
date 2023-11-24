"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const MenstrualCycleSchema = new mongoose_1.Schema({
    userId: {
        type: String,
        required: true,
    },
    month: {
        type: String,
        required: true,
    },
    startDate: {
        type: String,
    },
    endDate: {
        type: String,
    },
    durationCycle: {
        type: String,
    },
    startOvulation: {
        type: String,
    },
    notes: {
        type: String,
    },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('MenstrualCycle', MenstrualCycleSchema);
