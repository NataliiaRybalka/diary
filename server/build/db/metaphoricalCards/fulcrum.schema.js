"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const FulcrumSchema = new mongoose_1.Schema({
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
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('Fulcrum', FulcrumSchema);
