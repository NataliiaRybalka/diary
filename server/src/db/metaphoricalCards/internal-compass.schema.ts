import { model, Schema } from 'mongoose';
import { ICard } from './card.types';

const InternalCompassSchema = new Schema(
	{
		image: {
			type: String,
			require: true,
		},
		description: {
			type: String,
			require: true,
		},
	},
	{ timestamps: true }
);

export default model<ICard>('Internal Compass', InternalCompassSchema);