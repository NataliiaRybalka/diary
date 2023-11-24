"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCard = exports.getDeckCards = exports.putCard = exports.postCardFile = exports.postCard = void 0;
const fulcrum_schema_1 = __importDefault(require("../../db/metaphoricalCards/fulcrum.schema"));
const internal_compass_schema_1 = __importDefault(require("../../db/metaphoricalCards/internal-compass.schema"));
const constants_1 = require("../../lib/constants");
const postCard = async (req, res) => {
    const cards = req.body;
    try {
        const promises = [];
        for (const card of cards) {
            if (card.deck === constants_1.FULCRUM) {
                promises.push(fulcrum_schema_1.default.updateOne({ _id: card.file }, {
                    descriptionEn: card.descriptionEn,
                    descriptionRu: card.descriptionRu,
                    descriptionUa: card.descriptionUa,
                }));
            }
            else if (card.deck === constants_1.INTERNAL_COMPASS) {
                promises.push(await internal_compass_schema_1.default.updateOne({ _id: card.file }, {
                    descriptionEn: card.descriptionEn,
                    descriptionRu: card.descriptionRu,
                    descriptionUa: card.descriptionUa,
                }));
            }
        }
        await Promise.all(promises);
        res.status(201).json('saved');
    }
    catch (e) {
        res.status(400).json(e);
    }
};
exports.postCard = postCard;
const postCardFile = async (req, res) => {
    const files = req.files;
    if (!files)
        return;
    const file = files[0];
    const { originalname } = file;
    const deck = originalname.split('_')[0];
    try {
        let card;
        if (deck === constants_1.FULCRUM)
            card = await fulcrum_schema_1.default.create({ file: file.path });
        else if (deck === constants_1.INTERNAL_COMPASS)
            card = await internal_compass_schema_1.default.create({ file: file });
        res.status(201).json(card?._id);
    }
    catch (e) {
        res.status(400).json(e);
    }
};
exports.postCardFile = postCardFile;
const putCard = async (req, res) => {
    const { deck, cardId } = req.params;
    const card = req.body;
    try {
        if (deck === constants_1.FULCRUM)
            await fulcrum_schema_1.default.updateOne({ _id: cardId }, {
                descriptionEn: card.descriptionEn,
                descriptionRu: card.descriptionRu,
                descriptionUa: card.descriptionUa
            });
        else if (deck === constants_1.INTERNAL_COMPASS)
            await internal_compass_schema_1.default.updateOne({ _id: cardId }, {
                descriptionEn: card.descriptionEn,
                descriptionRu: card.descriptionRu,
                descriptionUa: card.descriptionUa
            });
        res.status(201).json('ok');
    }
    catch (e) {
        res.status(400).json(e);
    }
};
exports.putCard = putCard;
const getDeckCards = async (req, res) => {
    const { deck } = req.params;
    try {
        let cards;
        if (deck === constants_1.FULCRUM)
            cards = await fulcrum_schema_1.default.find();
        else if (deck === constants_1.INTERNAL_COMPASS)
            cards = await internal_compass_schema_1.default.find();
        if (!cards)
            return res.status(404).json('Not found');
        cards.map(card => {
            card.file = `${constants_1.BUCKET}/${card.file}`;
            return card;
        });
        res.status(200).json(cards);
    }
    catch (e) {
        res.status(400).json(e);
    }
};
exports.getDeckCards = getDeckCards;
const getCard = async (req, res) => {
    const { deck } = req.params;
    try {
        let card;
        if (deck === constants_1.FULCRUM)
            card = await fulcrum_schema_1.default.aggregate([{ $sample: { size: 1 } }]);
        else if (deck === constants_1.INTERNAL_COMPASS)
            card = await internal_compass_schema_1.default.aggregate([{ $sample: { size: 1 } }]);
        if (!card)
            return res.status(404).json('Not found');
        card = card[0];
        card.file = `${constants_1.BUCKET}/${card.file}`;
        res.status(200).json(card);
    }
    catch (e) {
        res.status(400).json(e);
    }
};
exports.getCard = getCard;
