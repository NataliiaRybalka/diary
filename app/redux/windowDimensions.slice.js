import { createSlice } from '@reduxjs/toolkit';

export const windowDimensionsSlice = createSlice({
	name: 'windowDimensions',
	initialState: {
		value: {
			width: 0,
			height: 0,
		},
	},
	reducers: {
		changeWD: (state, action) => {
			state.value = action.payload
		}
	}
});

export const { changeWD } = windowDimensionsSlice.actions;

export default windowDimensionsSlice.reducer;
