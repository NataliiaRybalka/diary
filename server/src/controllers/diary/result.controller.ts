import { Request, Response } from 'express';

import UserSchema from '../../db/user/user.schema';

export const getMonthResults = async (req: Request, res: Response) => {
	const { userId, month } = req.params;

	try {
		const user = await UserSchema.findById(userId).select('pages').populate({
			path: 'pages',
			select: ['date']
		});
		if (!user) return res.status(404).json('Not found');
console.log(user);

		res.status(200).json({page: user.pages});
	} catch (e) {
		res.status(404).json('Not found');
	}
};