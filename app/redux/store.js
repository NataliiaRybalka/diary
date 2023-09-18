import { configureStore } from '@reduxjs/toolkit';

import backgroundSlice from './bgColour.slice';
import languageSlice from './language.slice';
import userSlice from './user.slice';

export default configureStore({
	reducer: {
		bgColour: backgroundSlice,
		language: languageSlice,
		user: userSlice,
	}
});
