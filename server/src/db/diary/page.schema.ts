import { model, Schema } from 'mongoose';
import { IPage } from './page.types';

const PageSchema = new Schema(
	{
		user: {
			type: { type: Schema.Types.ObjectId, ref: 'User' },
		},
		date: {
			type: String,
			required: true,
			unique: true,
		},
		affirmation: {
			type: String,
		},
		menstrualDay: {
			type: String,
		},
		fellAsleep: {
			type: String,
		},
		wokeUp: {
			type: String,
		},
		totalHours: {
			type: String,
		},
		happiness: {
			type: String,
		},
		selfCare: {
			type: Boolean,
			default: false,
		},
		meditation: {
			type: Boolean,
			default: false,
		},
		upsetMe: {
			type: String,
		},
		grateful: {
			type: String,
		},
		drankWater: {
			type: String,
		},
		physicalActivity: {
			type: String,
		},
		notes: {
			type: String,
		},
	},
	{ timestamps: true }
);

export default model<IPage>('Page', PageSchema);
