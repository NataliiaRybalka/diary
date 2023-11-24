"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshPassword = exports.forgotPassword = exports.deactivateUser = exports.putUserData = exports.getUserData = exports.signinGoogle = exports.signin = exports.signup = void 0;
const encryption_1 = require("../../lib/encryption");
const hasher_1 = require("../../lib/hasher");
const notification_schema_1 = __importDefault(require("../../db/notification/notification.schema"));
const notification_types_1 = require("../../db/notification/notification.types");
const mail_1 = require("../../lib/mail");
const user_schema_1 = __importDefault(require("../../db/user/user.schema"));
const constants_1 = require("../../lib/constants");
const signup = async (req, res) => {
    const { userData, timezone, language, deviceToken } = req.body;
    const { email, username, password } = userData;
    try {
        const hashedPassword = await (0, hasher_1.hasher)(password);
        const user = await user_schema_1.default.create({ email, username, password: hashedPassword, language, deviceToken });
        await Promise.all([
            (0, mail_1.sendMail)(email, 'EMAIL_WELCOME', { username }, language),
            notification_schema_1.default.create({ userId: user._id, userData: {
                    email: user.email,
                    username: user.username,
                    deviceToken,
                }, date: 'everyday', time: `${8 + timezone}:00`, type: notification_types_1.NotificationTypesEnum.MORNING, language }),
            notification_schema_1.default.create({ userId: user._id, userData: {
                    email: user.email,
                    username: user.username,
                    deviceToken,
                }, date: 'everyday', time: `${20 + timezone}:00`, type: notification_types_1.NotificationTypesEnum.EVENING, language }),
        ]);
        return res.status(201).json(user);
    }
    catch (e) {
        return res.status(400).json(e);
    }
};
exports.signup = signup;
const signin = async (req, res) => {
    const { email, deviceToken } = req.body;
    try {
        const user = await user_schema_1.default.findOne({ email });
        if (deviceToken !== user?.deviceToken)
            await user_schema_1.default.updateOne({ email }, { deviceToken });
        return res.status(200).json(user);
    }
    catch (e) {
        return res.status(404).json('Not found');
    }
};
exports.signin = signin;
const signinGoogle = async (req, res) => {
    const { username, email, timezone, deviceToken, language } = req.body;
    try {
        let user = await user_schema_1.default.findOne({ email });
        if (user && !user.isActive)
            return res.status(404).json('Not found');
        if (deviceToken !== user?.deviceToken)
            await user_schema_1.default.updateOne({ email }, { deviceToken });
        if (!user) {
            const hashedPassword = await (0, hasher_1.hasher)(email);
            user = await user_schema_1.default.create({ email, username, password: hashedPassword, deviceToken, language });
            await Promise.all([
                (0, mail_1.sendMail)(email, 'EMAIL_WELCOME', { username }, language),
                notification_schema_1.default.create({ userId: user._id, userData: {
                        email: user.email,
                        username: user.username,
                        deviceToken,
                    }, date: 'everyday', time: `${8 + timezone}:00`, type: notification_types_1.NotificationTypesEnum.MORNING, language }),
                notification_schema_1.default.create({ userId: user._id, userData: {
                        email: user.email,
                        username: user.username,
                        deviceToken,
                    }, date: 'everyday', time: `${20 + timezone}:00`, type: notification_types_1.NotificationTypesEnum.EVENING, language }),
            ]);
        }
        return res.status(200).json(user);
    }
    catch (e) {
        return res.status(400).json(e);
    }
};
exports.signinGoogle = signinGoogle;
const getUserData = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await user_schema_1.default.findById(id);
        res.status(200).json(user);
    }
    catch (e) {
        res.status(404).json('Not found');
    }
};
exports.getUserData = getUserData;
const putUserData = async (req, res) => {
    const { id } = req.params;
    const userData = req.body;
    try {
        const user = await user_schema_1.default.findById(id);
        if (!user)
            return res.status(404).json('Not found');
        let hashedPassword = user.password;
        let newUsername = user.username;
        let newLanguage = user.language;
        if (userData.password)
            hashedPassword = await (0, hasher_1.hasher)(userData.password);
        if (userData.username)
            newUsername = userData.username;
        if (userData.language)
            newLanguage = userData.language;
        await user_schema_1.default.updateOne({ _id: id }, { username: newUsername, password: hashedPassword, language: newLanguage });
        const updatedUser = await user_schema_1.default.findById(id);
        res.status(201).json(updatedUser);
    }
    catch (e) {
        res.status(400).json(e);
    }
};
exports.putUserData = putUserData;
const deactivateUser = async (req, res) => {
    const { id } = req.params;
    const { email, username, language } = req.body;
    try {
        await user_schema_1.default.updateOne({ _id: id }, { isActive: false });
        await Promise.all([
            (0, mail_1.sendMail)(email, 'ACCOUNT_DELETED', { username }, language),
            notification_schema_1.default.deleteMany({ userId: id }),
            notification_schema_1.default.deleteMany({ userId: id }),
        ]);
        res.status(204).json('ok');
    }
    catch (e) {
        res.status(400).json(e);
    }
};
exports.deactivateUser = deactivateUser;
const forgotPassword = async (req, res) => {
    const { username, language, email } = req.body;
    try {
        const cipherEmail = await (0, encryption_1.cipheredText)(email);
        await (0, mail_1.sendMail)(email, 'REFRESH_PASSWORD', { username, verifyLink: `${constants_1.WEB}/refresh-password/${cipherEmail}` }, language);
        res.status(200).json('Email was sent');
    }
    catch (e) {
        res.status(400).json(e);
    }
};
exports.forgotPassword = forgotPassword;
const refreshPassword = async (req, res) => {
    const { userData, email } = req.body;
    const { password } = userData;
    const hashedPassword = await (0, hasher_1.hasher)(password);
    await user_schema_1.default.updateOne({ email }, { password: hashedPassword });
    res.status(201).json('ok');
};
exports.refreshPassword = refreshPassword;
