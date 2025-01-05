import { createSlice } from "@reduxjs/toolkit";

export const languageSlice = createSlice({
    name: "language",
    initialState: {
        value: "en",
    },
    reducers: {
        changeLang: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const { changeLang } = languageSlice.actions;

export default languageSlice.reducer;
