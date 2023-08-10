import { model, Schema } from 'mongoose';
import { IDayPlan } from './dayPlan.types';

const DayPlanSchema = new Schema(
	{
		user: {
			type: { type: Schema.Types.ObjectId, ref: 'User' },
		},
		date: {
			type: String,
			unique: true
		},
		plans: {
			type: Array,
		}
		// plans: {
		// 	type:  [{ type: Schema.Types.ObjectId, ref: 'Plan' }],
		// }
	},
	{ timestamps: true }
);

export default model<IDayPlan>('DayPlan', DayPlanSchema);
