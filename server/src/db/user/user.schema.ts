import { model, Schema } from 'mongoose';
import { IUser } from './user.types';

const validateEmail = function(email: string) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

export const UserSchema = new Schema(
	{
		email: {
			type: String,
			required: true,
			trim: true,
			lowercase: true,
			unique: true,
			validate: [validateEmail, 'Please fill a valid email address'],
			match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
		},
		username: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
			select: false,
		},
		isActive: {
			type: Boolean,
			required: true,
			default: true,
		},
		language: {
			type: String,
			required: true,
			default: 'en',
			enum: ['en', 'ru', 'ua'],
		},
		dayPlanNotification: {
			type: Boolean,
			default: true,
		},
		dayPlans: [
			{ type: Schema.Types.ObjectId, ref: 'DayPlan' }
		],
		pages: [
			{ type: Schema.Types.ObjectId, ref: 'Page' }
		],
	},
	{ timestamps: true }
);

export default model<IUser>('User', UserSchema);