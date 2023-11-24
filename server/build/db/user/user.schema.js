"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const mongoose_1 = require("mongoose");
const validateEmail = function (email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
};
exports.UserSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true,
    },
    role: {
        type: String,
        required: true,
        default: 'user',
        enum: ['admin', 'user'],
    },
    language: {
        type: String,
        required: true,
        default: 'en',
        enum: ['en', 'ru', 'ua'],
    },
    deviceToken: {
        type: String,
    },
    dayPlanNotification: {
        type: Boolean,
        default: true,
    },
    dayPlans: [
        { type: mongoose_1.Schema.Types.ObjectId, ref: 'DayPlan' }
    ],
    pages: [
        { type: mongoose_1.Schema.Types.ObjectId, ref: 'Page' }
    ],
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('User', exports.UserSchema);
