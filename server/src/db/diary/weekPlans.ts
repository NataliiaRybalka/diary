import { model, Schema } from 'mongoose';
import { IWeekPlans } from './weekPlans.types';

const WeekPlansSchema = new Schema(
	{
		user_id: {
			required: true,
			type: { type: Schema.Types.ObjectId, ref: 'User' },
		},
		weekDay: {
			type: String,
			required: true,
			enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday','Sunday']
		},
		date: {
			type: Number,
			required: true,
			min: 1,
			max: 31,
		},
		plans: {
			type:  [{ type: Schema.Types.ObjectId, ref: 'Plan' }],
		}
	},
	{ timestamps: true }
);

export default model<IWeekPlans>('WeekPlans', WeekPlansSchema);
