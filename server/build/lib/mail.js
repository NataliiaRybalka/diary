"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = void 0;
const email_templates_1 = __importDefault(require("email-templates"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const path_1 = __importDefault(require("path"));
const index_1 = require("../pug/en/index");
const index_2 = require("../pug/ru/index");
const index_3 = require("../pug/ua/index");
const USER = process.env.EMAIL;
const PASS = process.env.EMAIL_PASSWORD;
const templateParserFunc = (language) => new email_templates_1.default({
    views: {
        root: path_1.default.join(process.cwd(), `/src/pug/${language}`),
    }
});
const transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: USER,
        pass: PASS,
    }
});
const sendMail = async (userEmail, action, context = {}, language = 'en') => {
    try {
        let templateToSend;
        // @ts-ignore
        if (language === 'en')
            templateToSend = index_1.templateInfoen[action];
        // @ts-ignore
        else if (language === 'ru')
            templateToSend = index_2.templateInforu[action];
        // @ts-ignore
        else if (language === 'ua')
            templateToSend = index_3.templateInfoua[action];
        if (!templateToSend)
            throw new Error('Template not found');
        const templateParser = templateParserFunc(language);
        const html = await templateParser.render(templateToSend.templateName, context);
        await transporter.sendMail({
            from: {
                name: 'Your Best Friend',
                address: 'your.best.friend.diary@gmail.com'
            },
            to: userEmail,
            subject: templateToSend.subject,
            html
        });
    }
    catch (e) {
        console.log(e);
    }
};
exports.sendMail = sendMail;
