import { model, Schema } from 'mongoose';
import { ICard } from './card.types';

const FulcrumSchema = new Schema(
    {
        image: {
            type: String,
            require: true,
        },
        descriptionEn: {
            type: String,
        },
        descriptionRu: {
            type: String,
        },
        descriptionUa: {
            type: String,
        },
    },
    { timestamps: true }
);

export default model<ICard>('Fulcrum', FulcrumSchema);