import { model, Schema } from 'mongoose';
import { IMenstrualCycle } from './menstrualCycle.types';

const MenstrualCycleSchema = new Schema(
	{
		user: {
			type: { type: Schema.Types.ObjectId, ref: 'User' },
		},
		month: {
			type: String,
			required: true,
		},
		startDate: {
			type: String,
		},
		endDate: {
			type: String,
		},
		durationMenstruation: {
			type: String,
		},
		durationCycle: {
			type: String,
		},
		startOvulation: {
			type: String,
		},
		emotionalNotes: {
			type: String,
		},
		notes: {
			type: String,
		},
	},
	{ timestamps: true }
);

export default model<IMenstrualCycle>('MenstrualCycle', MenstrualCycleSchema);