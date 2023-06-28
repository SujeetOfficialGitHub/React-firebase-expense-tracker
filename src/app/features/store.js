import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import expenseSlice from './expenseSlice';
import themeSlice from "./themeSlice";

const store = configureStore({
    reducer: {
        auth: authSlice,
        expense: expenseSlice,
        theme: themeSlice
    }
})

export default store