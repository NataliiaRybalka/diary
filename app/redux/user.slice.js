import { createSlice } from "@reduxjs/toolkit";

export const backgroundSlice = createSlice({
    name: "user",
    initialState: {
        value: null,
    },
    reducers: {
        changeUser: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const { changeUser } = backgroundSlice.actions;

export default backgroundSlice.reducer;
