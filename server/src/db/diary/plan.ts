import { model, Schema } from 'mongoose';
import { IPlan } from './weekPlans.types'

const PlanSchema = new Schema(
	{
		weenPlans: {
			type: { type: Schema.Types.ObjectId, ref: 'WeekPlans' },
		},
		plan: {
			type: String,
		},
		time: {
			tipe: Date,
		},
	},
	{ timestamps: true }
);

export default model<IPlan>('Plan', PlanSchema);
