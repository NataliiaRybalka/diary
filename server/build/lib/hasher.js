"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparer = exports.hasher = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const hasher = async (password) => await bcrypt_1.default.hash(password, 10);
exports.hasher = hasher;
const comparer = async (password, hash) => await bcrypt_1.default.compare(password, hash);
exports.comparer = comparer;
