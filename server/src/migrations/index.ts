import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

export const migrationUp = async (req: Request, res: Response) => {
	try {
		fs.readdirSync(__dirname).forEach((filename: string) => {
			if (filename === 'index.ts') return;
			return require(path.join(__dirname, filename)).up();
		});

		res.json('ok');
	} catch (e) {
		migrationDown(res, e);
	}
};

export const migrationDown = (res: Response, e: any) => res.json(e);
