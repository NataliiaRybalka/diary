"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const DayPlanSchema = new mongoose_1.Schema({
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
    plans: {
        type: Array,
    },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('DayPlan', DayPlanSchema);
