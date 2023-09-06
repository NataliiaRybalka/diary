import fs from 'fs';
import path from 'path';

import FulcrumSchema from "../db/metaphoricalCards/fulcrum.schema";
import InternalCompassSchema from "../db/metaphoricalCards/internal-compass.schema";

export const up = async () => {
	try {
		fs.readdirSync(path.join(__dirname, 'cards')).forEach((filename: string) => {
			if (filename === 'index.ts') return;
			return fs.readFileSync(path.join(__dirname, 'cards', filename)).forEach(file => {
				console.log(file);
			})
		});
	} catch (e) {
		down(e);
	}
};

export const down = (e: any) => {
	throw new Error(e);
};
