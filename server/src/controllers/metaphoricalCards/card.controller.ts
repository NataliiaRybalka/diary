import { Request, Response } from 'express';

import FulcrumSchema from '../../db/metaphoricalCards/fulcrum.schema';
import InternalCompassSchema from '../../db/metaphoricalCards/internal-compass.schema';
import { FULCRUM, INTERNAL_COMPASS, SERVER } from '../../lib/constants';

export const postCard = async (req: Request, res: Response) => {
	const { deck, description, file } = req.body;

	try {
		let card;
		if (deck === FULCRUM) card = await FulcrumSchema.create({ description, image: file });
		else if (deck === INTERNAL_COMPASS) card = await InternalCompassSchema.create({ description, image: file });
		
		res.status(201).json(card);
	} catch (e) {
		res.status(400).json(e);
	}
};

export const getCards = async (req: Request, res: Response) => {
	try {
		const fulcrum = await FulcrumSchema.find();
		const internalCompass = await InternalCompassSchema.find();

		fulcrum.map(card => {
		card.image = `${SERVER}${card.image}`;
		return card;
		});
		internalCompass.map(card => {
		card.image = `${SERVER}${card.image}`;
		return card;
		});

		res.status(200).json({fulcrum, internalCompass});
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
		card.image = `${SERVER}${card.image}`;

		res.status(200).json(card);
	} catch (e) {
		res.status(400).json(e);
	}
};
