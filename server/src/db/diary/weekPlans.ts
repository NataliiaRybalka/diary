import { model, Schema } from 'mongoose';
import { IWeekPlans } from './weekPlans.types';

const WeekPlansSchema = new Schema(
	{
		user_id: {
			type: { type: Schema.Types.ObjectId, ref: 'User' },
		},
		date: {
			type: String,
		},
		plans: {
			type:  [{ type: Schema.Types.ObjectId, ref: 'Plan' }],
		}
	},
	{ timestamps: true }
);

export default model<IWeekPlans>('WeekPlans', WeekPlansSchema);
