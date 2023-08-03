import { model, Schema } from 'mongoose';
import { IUser } from './user.types';

const validateEmail = function(email: string) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const UserSchema = new Schema(
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
		password: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

export default model<IUser>('User', UserSchema);