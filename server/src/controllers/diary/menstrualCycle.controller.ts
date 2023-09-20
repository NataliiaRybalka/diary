import { Request, Response } from 'express';

import MenstrualCycleSchema from '../../db/diary/menstrualCycle.schema';

export const postMenstrualCycle = async (req: Request, res: Response) => {
	const { userId } = req.params;
	const { tableData } = req.body;

	try {
		const table = await MenstrualCycleSchema.create({ ...tableData, userId });
		res.status(201).json(table);
	} catch (e) {
		return res.status(400).json(e);
	}
};

export const getMenstrualCycle = async (req: Request, res: Response) => {
	const { userId } = req.params;

	try {
		const table = await MenstrualCycleSchema.find({ userId }).sort([['month', -1]]);
		res.status(200).json(table);
	} catch (e) {
		return res.status(404).json('Not found');
	}
};

export const putMenstrualCycle = async (req: Request, res: Response) => {
	const { id } = req.params;
	const { tableData } = req.body;

	try {
		await MenstrualCycleSchema.updateOne({ _id: id }, { ...tableData });
		const table = await MenstrualCycleSchema.findById(id);

		return res.status(201).json(table);
	} catch (e) {
		res.status(400).json(e);
	}
};
