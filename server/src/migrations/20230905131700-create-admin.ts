import { hasher } from '../lib/hasher';
import { IUser } from '../db/user/user.types';
import UserSchema from '../db/user/user.schema';

const ADMIN_EMAIL = process.env.ADMIN_EMAIL as string;
const ADMIN_USERNAME = process.env.ADMIN_USERNAME as string;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD as string;

export const up = async () => {
	try {
		const hashedPassword = await hasher(ADMIN_PASSWORD);
		const user = await UserSchema.findOne({ email: ADMIN_EMAIL });
		if (!user) return await UserSchema.create({ email: ADMIN_EMAIL, username: ADMIN_USERNAME, password: hashedPassword }) as IUser;
	} catch (e) {
		down(e);
	}
};

export const down = (e: any) => {
	throw new Error(e);
};
