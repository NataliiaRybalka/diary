"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.migrationDown = exports.migrationUp = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const migrationUp = async (req, res) => {
    try {
        fs_1.default.readdirSync(__dirname).forEach((filename) => {
            if (filename === 'index.ts')
                return;
            return require(path_1.default.join(__dirname, filename)).up();
        });
        res.json('ok');
    }
    catch (e) {
        (0, exports.migrationDown)(res, e);
    }
};
exports.migrationUp = migrationUp;
const migrationDown = (res, e) => res.json(e);
exports.migrationDown = migrationDown;
