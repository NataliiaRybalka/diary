"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isActiveForUpdate = exports.isActive = exports.decipheredEmail = exports.signinMid = exports.checkEmailAndUsername = exports.checkPassword = void 0;
const user_schema_1 = __importDefault(require("../db/user/user.schema"));
const hasher_1 = require("../lib/hasher");
const encryption_1 = require("../lib/encryption");
const checkPassword = async (req, res, next) => {
    const { password } = req.body.userData;
    if (password.length < 6)
        return res.status(403).json('Password must have 6 or more symbols');
    else
        next();
};
exports.checkPassword = checkPassword;
const checkEmailAndUsername = async (req, res, next) => {
    const { email, username } = req.body.userData;
    try {
        const user = await user_schema_1.default.findOne({ $or: [{ email }, { username }] });
        if (user)
            return res.status(403).json('This email or username already exists.');
        next();
    }
    catch (e) {
        res.status(400).json(e);
    }
};
exports.checkEmailAndUsername = checkEmailAndUsername;
const signinMid = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await user_schema_1.default.findOne({ email }).select('+password');
    if (!user)
        res.status(404).json('Wrong email or password');
    if (!user.isActive)
        res.status(404).json('Not found');
    const isCompared = await (0, hasher_1.comparer)(password, user.password);
    if (!isCompared)
        res.status(404).json('Wrong email or password');
    next();
};
exports.signinMid = signinMid;
const decipheredEmail = async (req, res, next) => {
    const { cipherEmail } = req.params;
    const email = await (0, encryption_1.decipheredText)(cipherEmail);
    req.body.email = email;
    next();
};
exports.decipheredEmail = decipheredEmail;
const isActive = async (req, res, next) => {
    const { id, email } = req.params;
    let user;
    if (id)
        user = await user_schema_1.default.findById(id);
    else if (email)
        user = await user_schema_1.default.findOne({ email });
    if (user && user.isActive) {
        req.body.email = user.email;
        req.body.username = user.username;
        req.body.language = user.language;
        next();
    }
    else
        res.status(404).json('Not found');
};
exports.isActive = isActive;
const isActiveForUpdate = async (req, res, next) => {
    const { id, email } = req.params;
    let user;
    if (id)
        user = await user_schema_1.default.findById(id);
    else if (email)
        user = await user_schema_1.default.findOne({ email });
    if (user && user.isActive) {
        req.body.email = user.email;
        req.body.language = user.language;
        next();
    }
    else
        res.status(404).json('Not found');
};
exports.isActiveForUpdate = isActiveForUpdate;
