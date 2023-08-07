enum Language {
	EN = 'en',
	RU = 'ru',
	UA = 'ua',
}

export interface IUser {
	email: string;
	username: string;
	password: string;
	isActive: boolean;
	language: Language;
}