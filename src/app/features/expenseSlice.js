import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const removeSpecialChar = (email) => {
    return email.replace('@', '').replace('.','')
}

export const fetchExpense = createAsyncThunk('expense/fetchExpense', async({email}, {rejectWithValue}) => {
    try{
        const res = await axios.get(`https://${process.env.REACT_APP_FIREBASE_PROJECT_ID}.firebaseio.com/${removeSpecialChar(email)}.json`);
        return res.data
    }catch(error){
        console.log(error)
        return rejectWithValue(error.response.data.error)
    }
})
export const addExpense = createAsyncThunk('expense/addExpense', async({enteredData, email}, {rejectWithValue}) => {
    try{
        const res = await axios.post(`https://${process.env.REACT_APP_FIREBASE_PROJECT_ID}.firebaseio.com/${removeSpecialChar(email)}.json`, enteredData);
        return {...enteredData, id: res.data.name}
    }catch(error){
        console.log(error)
        return rejectWithValue(error.response.data.error)
    }
})

const expenseInitialState = {
    expenses: [],
    loading: false
}
const expenseSlice = createSlice({
    name: 'expense',
    initialState: expenseInitialState,
    extraReducers: (builder) => {
        builder
            // Fetch Expenses 
            .addCase(fetchExpense.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchExpense.fulfilled, (state, action) => {
                state.loading = false;
                let data = [];
                for (let key in action.payload){
                   data.push({...action.payload[key],id: key})
                }
                state.expenses = data
            })
            .addCase(fetchExpense.rejected, (state, action) => {
                state.loading = false
                // console.log(action)
            })
            // Add Expenses 
            .addCase(addExpense.pending, (state) => {
                state.loading = true;
            })
            .addCase(addExpense.fulfilled, (state, action) => {
                state.loading = false;
                state.expenses = [...state.expenses, action.payload]
                // console.log(action);
            })
            .addCase(addExpense.rejected, (state, action) => {
                state.loading = false
                // console.log(action)
            })
    }
})

export default expenseSlice.reducer