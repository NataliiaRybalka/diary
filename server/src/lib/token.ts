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
