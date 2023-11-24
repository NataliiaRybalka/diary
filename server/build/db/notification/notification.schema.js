"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const NotificationSchema = new mongoose_1.Schema({
    user: {
        type: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    },
    userId: {
        type: String,
        required: true,
    },
    userData: {
        type: Object,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    needToSend: {
        type: Boolean,
        default: true,
    },
    isSent: {
        type: Boolean,
        default: false,
    },
    task: {
        type: String,
    },
    taskTime: {
        type: String,
    },
    language: {
        type: String,
        required: true,
        default: 'en',
        enum: ['en', 'ru', 'ua'],
    }
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('Notification', NotificationSchema);
