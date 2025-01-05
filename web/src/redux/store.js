import { configureStore } from "@reduxjs/toolkit";

import backgroundSlice from "./bgColour.slice";
import languageSlice from "./language.slice";
import windowDimensionsSlice from "./windowDimensions.slice";

export default configureStore({
    reducer: {
        bgColour: backgroundSlice,
        language: languageSlice,
        windowDimensions: windowDimensionsSlice,
    },
});
