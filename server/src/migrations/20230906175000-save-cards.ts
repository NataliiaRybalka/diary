import fs from 'fs';
import path from 'path';
import * as csv from 'fast-csv';

import FulcrumSchema from "../db/metaphoricalCards/fulcrum.schema";
import InternalCompassSchema from "../db/metaphoricalCards/internal-compass.schema";

const saveFiles = () => {
	try {
		const cardsFolderPath = path.join(__dirname, 'lib/cards');
		fs.readdirSync(cardsFolderPath).forEach((filename: string) => {
			fs.readFile(path.join(cardsFolderPath, filename), (err, file) => {
				if (err) throw new Error(err.message);
				
				fs.writeFile(path.join('storage', filename), file, (err) => {
					if (err) throw new Error(err.message);
					else return file;
				});
			});
		});
		console.log('files was saved');
	} catch (e: any) {
		throw new Error(e.message);
	}
};

const saveCardsToDb = async () => {
	try {
		const filesPathes = [path.join(__dirname, 'lib/files/fulcrum.csv'), path.join(__dirname, 'lib/files/internalCompass.csv')];

		for (const filePath of filesPathes) {
			let deckArr = filePath.split('/');
			deckArr = deckArr[deckArr.length - 1].split('.');
			const deck = deckArr[0];

			await new Promise<void>((resolve, reject) => {
				fs.createReadStream(filePath).pipe(
					csv
						.parse({headers: true})
						.on('data', async (row) => {
							if (!row) return;

							if (deck === 'fulcrum')	await FulcrumSchema.create({ ... row });
							else if (deck === 'internalCompass') await InternalCompassSchema.create({ ... row });
						})
						.on('end', async (rowCount: number) => {
							resolve();
						}),
				);
			});
		}
		
		console.log('cards was saved');
	} catch (e: any) {
		throw new Error(e.message);
	}
};

export const up = async () => {
	try {
		const fulcrumData = await FulcrumSchema.count();

		if (!fulcrumData) {
			await saveFiles();
			await saveCardsToDb();
		}
	} catch (e) {
		down(e);
	}
};

export const down = (e: any) => {
	throw new Error(e);
};
