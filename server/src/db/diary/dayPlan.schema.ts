import { model, Schema } from 'mongoose';
import { IDayPlan } from './dayPlan.types';

const DayPlanSchema = new Schema(
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
		plans: {
			type: Array,
		},
	},
	{ timestamps: true }
);

export default model<IDayPlan>('DayPlan', DayPlanSchema);
