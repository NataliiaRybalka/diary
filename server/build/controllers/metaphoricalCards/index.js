"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const card_controller_1 = require("./card.controller");
exports.default = {
    getCard: card_controller_1.getCard,
    getDeckCards: card_controller_1.getDeckCards,
    postCard: card_controller_1.postCard,
    postCardFile: card_controller_1.postCardFile,
    putCard: card_controller_1.putCard,
};
