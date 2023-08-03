import jwt from 'jsonwebtoken';

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'access';
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'refresh';

export const createTokens = async (username: string, email: string) => {
	const accessToken = jwt.sign({
		username,
		email,
	}, ACCESS_TOKEN_SECRET, {
		expiresIn: '60m'
	});

	const refreshToken = jwt.sign({
		username,
	}, REFRESH_TOKEN_SECRET, { expiresIn: '10d' });

	return { accessToken, refreshToken };
};

export const verifyToken = async (cookie: string, email: string, username: string) => {
	let refreshToken = '';
	let result;
	cookie.split("; ").reduce(function(obj: any, str, index) {
		let strParts = str.split("=");			
		if (strParts[0] && strParts[1]) {				
			obj[strParts[0]] = strParts[1];
		}
		refreshToken = obj.jwt;
		return obj;
	}, {});

	jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, 
	(err: any, decoded: any) => {
		if (err) result = 'Unauthorized';
		else {
			result = jwt.sign({
				username,
				email,
			}, ACCESS_TOKEN_SECRET, {
				expiresIn: '70m'
			});
		}
	});

	return result;
};
