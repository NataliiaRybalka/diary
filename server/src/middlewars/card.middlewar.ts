import multer from 'multer';
import * as url from 'url';

// @ts-ignore
// const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
const fileStorage = multer.diskStorage({
	destination: __dirname + 'storage/',
	filename: (req, file, cb) => {
		req.body.file = file.originalname
		cb(null, file.originalname);
	}
});

export const uploadImage = multer({
	storage: fileStorage,
	limits: {
		fileSize: 1000000
	},
});
