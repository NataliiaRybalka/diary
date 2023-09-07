import { model, Schema } from 'mongoose';
import { IPage } from './page.types';

const PageSchema = new Schema(
	{
		user: {
			type: { type: Schema.Types.ObjectId, ref: 'User' },
		},
		userId: {
			type: String,
			required: true,
		},
		date: {
			type: String,
			required: true,
		},
		month: {
			type: String,
			required: true,
		},
		affirmation: {
			type: String,
		},
		menstrualDay: {
			type: Number,
		},
		fellAsleep: {
			type: String,
		},
		wokeUp: {
			type: String,
		},
		totalHours: {
			type: Number,
		},
		grateful: {
			type: String,
		},
		feeling: {
			type: String,
		},
		drankWater: {
			type: Number,
		},
		physicalActivity: {
			type: Number,
		},
		notes: {
			type: String,
		},
	},
	{ timestamps: true }
);

export default model<IPage>('Page', PageSchema);
