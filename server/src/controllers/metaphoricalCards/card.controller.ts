import { Request, Response } from 'express';

import FulcrumSchema from '../../db/metaphoricalCards/fulcrum.schema';
import InternalCompassSchema from '../../db/metaphoricalCards/internal-compass.schema';
import { FULCRUM, INTERNAL_COMPASS, SERVER } from '../../lib/constants';

export const postCard = async (req: Request, res: Response) => {
	const cards = req.body;

	try {
		const promises = [];
		for (const card of cards) {
			if (card.deck === FULCRUM) {
				promises.push(FulcrumSchema.updateOne({ _id: card.file}, {
					descriptionEn: card.descriptionEn,
					descriptionRu: card.descriptionRu,
					descriptionUa: card.descriptionUa,
				}));
			}
			else if (card.deck === INTERNAL_COMPASS) {
				promises.push(await InternalCompassSchema.updateOne({ _id: card.file},  {
					descriptionEn: card.descriptionEn,
					descriptionRu: card.descriptionRu,
					descriptionUa: card.descriptionUa,
				}));
			}
		}
		await Promise.all(promises);
		
		res.status(201).json('saved');
	} catch (e) {
		res.status(400).json(e);
	}
};

export const postCardFile = async (req: Request, res: Response) => {
	const files = req.files as any[];
	if (!files) return;
	const file = files[0];
	const { originalname } = file;
	const deck = originalname.split('_')[0];

	try {
		let card;
		if (deck === FULCRUM) card = await FulcrumSchema.create({ file: file.path });
		else if (deck === INTERNAL_COMPASS) card = await InternalCompassSchema.create({ file: file });
		
		res.status(201).json(card?._id);
	} catch (e) {
		res.status(400).json(e);
	}
};

export const putCard = async (req: Request, res: Response) => {
	const { deck, cardId } = req.params;
	const card = req.body;

	try {
		if (deck === FULCRUM) await FulcrumSchema.updateOne({ _id: cardId }, {
			descriptionEn: card.descriptionEn,
			descriptionRu: card.descriptionRu,
			descriptionUa: card.descriptionUa
		});
		else if (deck === INTERNAL_COMPASS) await InternalCompassSchema.updateOne({ _id: cardId }, {
			descriptionEn: card.descriptionEn,
			descriptionRu: card.descriptionRu,
			descriptionUa: card.descriptionUa
		});

		res.status(201).json('ok');
	} catch (e) {
		res.status(400).json(e);
	}
};

export const getDeckCards = async (req: Request, res: Response) => {
	const { deck } = req.params;

	try {
		let cards;
		if (deck === FULCRUM) cards = await FulcrumSchema.find();
		else if (deck === INTERNAL_COMPASS) cards = await InternalCompassSchema.find();

		if (!cards) return res.status(404).json('Not found');
		cards.map(card => {
			card.file = `${SERVER}/${card.file}`;
			return card;
		});

		res.status(200).json(cards);
	} catch (e) {
		res.status(400).json(e);
	}
};

export const getCard = async (req: Request, res: Response) => {
	const { deck } = req.params;

	try {
		let card;
		if (deck === FULCRUM) card = await FulcrumSchema.aggregate([{ $sample: { size: 1 } }]);
		else if (deck === INTERNAL_COMPASS) card = await InternalCompassSchema.aggregate([{ $sample: { size: 1 } }]);

		if (!card) return res.status(404).json('Not found');
		card = card[0];
		card.file = `${SERVER}${card.file}`;

		res.status(200).json(card);
	} catch (e) {
		res.status(400).json(e);
	}
};
