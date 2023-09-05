import {
	uploadImage
} from './card.middlewar';

import {
	checkPassword,
	checkEmailAndUsername,
	decipheredEmail,
	isActive,
	signinMid,
} from './user.middlewar';

export default {
	checkPassword,
	checkEmailAndUsername,
	decipheredEmail,
	isActive,
	signinMid,
	uploadImage,
};
