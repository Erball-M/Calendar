import { configureStore } from "@reduxjs/toolkit";
import dataSlice from "./slices/dataSlice"

const store = configureStore({
    reducer: {
        [dataSlice.name]: dataSlice.reducer,
    },
})

export default store