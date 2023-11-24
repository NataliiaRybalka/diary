"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const PageSchema = new mongoose_1.Schema({
    user: {
        type: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    },
    userId: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    month: {
        type: String,
        required: true,
    },
    affirmation: {
        type: String,
    },
    menstrualDay: {
        type: Number,
    },
    fellAsleep: {
        type: String,
    },
    wokeUp: {
        type: String,
    },
    totalHours: {
        type: Number,
    },
    grateful: {
        type: String,
    },
    feeling: {
        type: String,
    },
    drankWater: {
        type: Number,
    },
    physicalActivity: {
        type: Number,
    },
    notes: {
        type: String,
    },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('Page', PageSchema);
