import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';
import multer from 'multer';

interface IFile {
	mimetype: string;
	originalname: string;
	path: string;
	size: number;
}

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, path.join(__dirname,'storage/'));
	},
	filename: (req, file, cb) => {
		cb(null, Date.now() + '-' + file.originalname);
	}
});
const upload = multer({ storage: storage }).single('file');

export const saveFiles = async (req: Request, res: Response, next: NextFunction) => {
console.log(req.body);

	// upload.array('files', 5)(req, res, err => {
	// 	if (err) return res.status(400).json({ error: err.message });

	// 	const files = req.files as IFile[];
	// 	if (!files) return res.status(400).json('No files');
		
	// 	const errors = [] as String[];
	// 	files.forEach((file: IFile) => {
	// 		const allowedTypes = ['image/jpeg', 'image/png'];
	// 	  	const maxSize = 5 * 1024 * 1024; // 5MB
	
	// 		if (!allowedTypes.includes(file.mimetype)) errors.push(`Invalid file type: ${file.originalname}`);
	// 		if (file.size > maxSize) errors.push(`File too large: ${file.originalname}`);
	// 	});
	
	// 	if (errors.length > 0) {
	// 		files.forEach((file) => {
	// 			fs.unlinkSync(file.path);
	// 		});
			
	// 		return res.status(400).json({ errors });
	// 	}

	// 	// @ts-ignore
	// 	req.files = files;
	// 	next();
	// });
};
