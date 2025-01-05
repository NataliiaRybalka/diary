import EmailTemplates from "email-templates";
import nodemailer from "nodemailer";
import path from "path";

import { templateInfoen } from "../pug/en/index";
import { templateInforu } from "../pug/ru/index";
import { templateInfoua } from "../pug/ua/index";

const USER = process.env.EMAIL;
const PASS = process.env.EMAIL_PASSWORD;

const templateParserFunc = (language: string) =>
    new EmailTemplates({
        views: {
            root: path.join(process.cwd(), `/src/pug/${language}`),
        },
    });

const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: USER,
        pass: PASS,
    },
});

export const sendMail = async (
    userEmail: string,
    action: string,
    context = {},
    language = "en"
) => {
    try {
        let templateToSend;
        // @ts-ignore
        if (language === "en") templateToSend = templateInfoen[action];
        // @ts-ignore
        else if (language === "ru") templateToSend = templateInforu[action];
        // @ts-ignore
        else if (language === "ua") templateToSend = templateInfoua[action];

        if (!templateToSend) throw new Error("Template not found");

        const templateParser = templateParserFunc(language);
        const html = await templateParser.render(
            templateToSend.templateName,
            context
        );
        await transporter.sendMail({
            from: {
                name: "Your Best Friend",
                address: "your.best.friend.diary@gmail.com",
            },
            to: userEmail,
            subject: templateToSend.subject,
            html,
        });
    } catch (e) {
        console.log(e);
    }
};
