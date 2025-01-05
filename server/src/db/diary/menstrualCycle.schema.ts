import { model, Schema } from "mongoose";
import { IMenstrualCycle } from "./menstrualCycle.types";
import { UserSchema } from "../user/user.schema";

const MenstrualCycleSchema = new Schema(
    {
        userId: {
            type: String,
            required: true,
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
        durationCycle: {
            type: String,
        },
        startOvulation: {
            type: String,
        },
        notes: {
            type: String,
        },
    },
    { timestamps: true }
);

export default model<IMenstrualCycle>("MenstrualCycle", MenstrualCycleSchema);
