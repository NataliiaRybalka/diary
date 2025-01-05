import { model, Schema } from "mongoose";
import { ICard } from "./card.types";

const InternalCompassSchema = new Schema(
    {
        file: {
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

export default model<ICard>("Internal Compass", InternalCompassSchema);
