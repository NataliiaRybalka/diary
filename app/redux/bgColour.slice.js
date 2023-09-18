import { createSlice } from '@reduxjs/toolkit';

export const backgroundSlice = createSlice({
	name: 'bgColour',
	initialState: {
		value: '#ffe5cc',
	},
	reducers: {
		changeBg: (state, action) => {
			state.value = action.payload
		}
	}
});

export const { changeBg } = backgroundSlice.actions;

export default backgroundSlice.reducer;
