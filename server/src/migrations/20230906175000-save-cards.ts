import fs from 'fs';
import path from 'path';

import FulcrumSchema from "../db/metaphoricalCards/fulcrum.schema";
import InternalCompassSchema from "../db/metaphoricalCards/internal-compass.schema";

const saveFiles = () => {
	try {
		const cardsFolderPath = path.join(__dirname, 'lib/cards');
		fs.readdirSync(cardsFolderPath).forEach((filename: string) => {
			fs.readFile(path.join(cardsFolderPath, filename), (err, data) => {
				if (err) throw new Error(err.message);
				
				fs.writeFile(path.join('storage', filename), data, (err) => {
					if (err) throw new Error(err.message);
					else return data;
				});
			});
		});
		console.log('files was saved');
	} catch (e: any) {
		throw new Error(e.message);
	}
};

const saveCardsToDb = async () => {

};

export const up = async () => {
	try {
		await saveFiles();
	} catch (e) {
		down(e);
	}
};

export const down = (e: any) => {
	throw new Error(e);
};
