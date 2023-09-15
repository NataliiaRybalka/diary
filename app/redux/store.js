import { configureStore } from '@reduxjs/toolkit';

import backgroundSlice from './bgColour.slice';
import languageSlice from './language.slice';

export default configureStore({
	reducer: {
		bgColour: backgroundSlice,
		language: languageSlice,
	}
});
