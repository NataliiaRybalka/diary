"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
const hasher_1 = require("../lib/hasher");
const user_schema_1 = __importDefault(require("../db/user/user.schema"));
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const up = async () => {
    try {
        const hashedPassword = await (0, hasher_1.hasher)(ADMIN_PASSWORD);
        const user = await user_schema_1.default.findOne({ email: ADMIN_EMAIL });
        if (!user)
            return await user_schema_1.default.create({ email: ADMIN_EMAIL, username: ADMIN_USERNAME, password: hashedPassword, role: 'admin' });
    }
    catch (e) {
        (0, exports.down)(e);
    }
};
exports.up = up;
const down = (e) => {
    throw new Error(e);
};
exports.down = down;
