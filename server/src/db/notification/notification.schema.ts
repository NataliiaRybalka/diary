import { model, Schema } from 'mongoose';
import { INotification } from './notification.types';

const NotificationSchema = new Schema(
	{
		user: {
			type: { type: Schema.Types.ObjectId, ref: 'User' },
		},
		userId: {
			type: String,
			required: true,
		},
		userData: {
			type: Object,
			required: true,
		},
		date: {
			type: String,
			required: true,
		},
		time: {
			type: String,
			required: true,
		},
		type: {
			type: String,
			required: true,
		},
		needToSend: {
			type: Boolean,
			default: true,
		},
		isSent: {
			type: Boolean,
			default: false,
		},
		task: {
			type: String,
		},
		taskTime: {
			type: String,
		},
	},
	{ timestamps: true }
);

export default model<INotification>('Notification', NotificationSchema);
