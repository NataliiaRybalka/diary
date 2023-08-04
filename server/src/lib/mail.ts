import EmailTemplates from 'email-templates';
import nodemailer from 'nodemailer';
import path from 'path';

import { templateInfo } from '../pug/index';

const USER = process.env.EMAIL;
const PASS = process.env.EMAIL_PASSWORD;

const templateParser = new EmailTemplates({
	views: {
		root: path.join(process.cwd(), '/src/pug'),
	}
});

const transporter = nodemailer.createTransport({
	service: 'gmail',
	host: 'smtp.gmail.com',
	port: 465,
	secure: true,
	auth: {
		user: USER,
		pass: PASS,
	}
});

export const sendMail = async (userEmail: string, action: string, context = {}) => {
	try {
		// @ts-ignore
		const templateToSend = templateInfo[action];
		if (!templateToSend) throw new Error('Template not found');

		const html = await templateParser.render(templateToSend.templateName, context);

		await transporter.sendMail({
			from: {
				name: 'Diary',
				address: 'diary@gmail.com'
			},
			to: userEmail,
			subject: templateToSend.subject,
			html
		});
	} catch (e) {
		console.log(e);
	}
};
