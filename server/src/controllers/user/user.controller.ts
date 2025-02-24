import { Request, Response } from "express";

import { cipheredText } from "../../lib/encryption";
import { IUser } from "../../db/user/user.types";
import { hasher } from "../../lib/hasher";
import NotificationSchema from "../../db/notification/notification.schema";
import { NotificationTypesEnum } from "../../db/notification/notification.types";
import { sendMail } from "../../lib/mail";
import UserSchema from "../../db/user/user.schema";
import { WEB } from "../../lib/constants";

export const signup = async (req: Request, res: Response) => {
    const { userData, timezone, language, deviceToken } = req.body;
    const { email, username, password } = userData;

    try {
        const hashedPassword = await hasher(password);
        const user = await UserSchema.create({
            email,
            username,
            password: hashedPassword,
            language,
            deviceToken,
        });

        await Promise.all([
            sendMail(email, "EMAIL_WELCOME", { username }, language),
            NotificationSchema.create({
                userId: user._id,
                userData: {
                    email: user.email,
                    username: user.username,
                    deviceToken,
                },
                date: "everyday",
                time: `${8 + timezone}:00`,
                type: NotificationTypesEnum.MORNING,
                language,
            }),
            NotificationSchema.create({
                userId: user._id,
                userData: {
                    email: user.email,
                    username: user.username,
                    deviceToken,
                },
                date: "everyday",
                time: `${20 + timezone}:00`,
                type: NotificationTypesEnum.EVENING,
                language,
            }),
        ]);

        return res.status(201).json(user);
    } catch (e) {
        return res.status(400).json(e);
    }
};

export const signin = async (req: Request, res: Response) => {
    const { email, deviceToken } = req.body;

    try {
        const user = (await UserSchema.findOne({ email })) as IUser;
        if (deviceToken !== user?.deviceToken)
            await UserSchema.updateOne({ email }, { deviceToken });

        return res.status(200).json(user);
    } catch (e) {
        return res.status(404).json("Not found");
    }
};

export const signinGoogle = async (req: Request, res: Response) => {
    const { username, email, timezone, deviceToken, language } = req.body;

    try {
        let user = await UserSchema.findOne({ email });
        if (user && !user.isActive) return res.status(404).json("Not found");
        if (deviceToken !== user?.deviceToken)
            await UserSchema.updateOne({ email }, { deviceToken });

        if (!user) {
            const hashedPassword = await hasher(email);
            user = await UserSchema.create({
                email,
                username,
                password: hashedPassword,
                deviceToken,
                language,
            });

            await Promise.all([
                sendMail(email, "EMAIL_WELCOME", { username }, language),
                NotificationSchema.create({
                    userId: user._id,
                    userData: {
                        email: user.email,
                        username: user.username,
                        deviceToken,
                    },
                    date: "everyday",
                    time: `${8 + timezone}:00`,
                    type: NotificationTypesEnum.MORNING,
                    language,
                }),
                NotificationSchema.create({
                    userId: user._id,
                    userData: {
                        email: user.email,
                        username: user.username,
                        deviceToken,
                    },
                    date: "everyday",
                    time: `${20 + timezone}:00`,
                    type: NotificationTypesEnum.EVENING,
                    language,
                }),
            ]);
        }

        return res.status(200).json(user);
    } catch (e) {
        return res.status(400).json(e);
    }
};

export const getUserData = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const user = (await UserSchema.findById(id)) as IUser;
        res.status(200).json(user);
    } catch (e) {
        res.status(404).json("Not found");
    }
};

export const putUserData = async (req: Request, res: Response) => {
    const { id } = req.params;
    const userData = req.body;

    try {
        const user = (await UserSchema.findById(id)) as IUser;
        if (!user) return res.status(404).json("Not found");

        let hashedPassword = user.password;
        let newUsername = user.username;
        let newLanguage = user.language;
        if (userData.password) hashedPassword = await hasher(userData.password);
        if (userData.username) newUsername = userData.username;
        if (userData.language) newLanguage = userData.language;

        await UserSchema.updateOne(
            { _id: id },
            {
                username: newUsername,
                password: hashedPassword,
                language: newLanguage,
            }
        );
        const updatedUser = (await UserSchema.findById(id)) as IUser;
        res.status(201).json(updatedUser);
    } catch (e) {
        res.status(400).json(e);
    }
};

export const deactivateUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { email, username, language } = req.body;

    try {
        await UserSchema.updateOne({ _id: id }, { isActive: false });

        await Promise.all([
            sendMail(email, "ACCOUNT_DELETED", { username }, language),
            NotificationSchema.deleteMany({ userId: id }),
            NotificationSchema.deleteMany({ userId: id }),
        ]);

        res.status(204).json("ok");
    } catch (e) {
        res.status(400).json(e);
    }
};

export const forgotPassword = async (req: Request, res: Response) => {
    const { username, language, email } = req.body;

    try {
        const cipherEmail = await cipheredText(email);
        await sendMail(
            email,
            "REFRESH_PASSWORD",
            { username, verifyLink: `${WEB}/refresh-password/${cipherEmail}` },
            language
        );

        res.status(200).json("Email was sent");
    } catch (e) {
        res.status(400).json(e);
    }
};

export const refreshPassword = async (req: Request, res: Response) => {
    const { userData, email } = req.body;
    const { password } = userData;

    const hashedPassword = await hasher(password);
    await UserSchema.updateOne({ email }, { password: hashedPassword });

    res.status(201).json("ok");
};
