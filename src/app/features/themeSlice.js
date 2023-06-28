import { createSlice } from "@reduxjs/toolkit";


const themeSlice = createSlice({
    name: 'theme',
    initialState: {
        color: localStorage.getItem('color') ? localStorage.getItem('color'): 'white',
    },
    reducers: {
        themeColor(state, action){
            state.color = action.payload.color;
            localStorage.setItem('color', action.payload.color);
        },
    }

})
export const {themeColor} = themeSlice.actions;
export default themeSlice.reducer;