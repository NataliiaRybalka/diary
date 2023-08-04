import CryptoJS from 'crypto-js';

const SECRET_KEY = process.env.SECRET_KEY;

export const cipheredText = (text: string) => {
	if (!SECRET_KEY) throw new Error('Key not found');

	let cipherText = CryptoJS.AES.encrypt(text, SECRET_KEY).toString();
	return cipherText.toString().replace('/','Por21Ld'); 
}

export const decipheredText = (cipherText: string) => {
	if (!SECRET_KEY) throw new Error('Key not found');

	cipherText = cipherText.toString().replace('Por21Ld', '/');
	const bytes = CryptoJS.AES.decrypt(cipherText, SECRET_KEY);
	const originalText = bytes.toString(CryptoJS.enc.Utf8);
	
	return originalText;
};
