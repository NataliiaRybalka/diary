enum Language {
	EN = 'en',
	RU = 'ru',
	UA = 'ua',
}

enum Sex {
	MALE = 'male',
	FEMALE = 'female',
}

export interface IUser {
	email: string;
	username: string;
	password: string;
	isActive: boolean;
	language: Language;
	sex: Sex
}