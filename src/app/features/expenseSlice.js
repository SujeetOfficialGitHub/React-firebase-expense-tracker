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
// Add Expenses 
export const addExpense = createAsyncThunk('expense/addExpense', async({enteredData, email}, {rejectWithValue}) => {
    try{
        const res = await axios.post(`https://${process.env.REACT_APP_FIREBASE_PROJECT_ID}.firebaseio.com/${removeSpecialChar(email)}.json`, enteredData);
        return {...enteredData, id: res.data.name}
    }catch(error){
        return rejectWithValue(error.response.data.error)
    }
})
// Update Expenses 
export const updateExpense = createAsyncThunk('expense/updateExpense', async({enteredData, email, id}, {rejectWithValue}) => {
    try{
        const res = await axios.put(`https://${process.env.REACT_APP_FIREBASE_PROJECT_ID}.firebaseio.com/${removeSpecialChar(email)}/${id}.json`, enteredData);
        return {...res.data, id: id}
    }catch(error){
        return rejectWithValue(error.response.data.error)
    }
})
// Delete Expenses 
export const deleteExpense = createAsyncThunk('expense/deleteExpense', async({email, id}, {rejectWithValue}) => {
    try{
        const res = await axios.delete(`https://${process.env.REACT_APP_FIREBASE_PROJECT_ID}.firebaseio.com/${removeSpecialChar(email)}/${id}.json`);
        return id
    }catch(error){
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


            // update Expenses 
            .addCase(updateExpense.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateExpense.fulfilled, (state, action) => {
                state.loading = false;
                state.expenses = state.expenses.map((expense) => {
                    if (expense.id === action.payload.id){
                        return action.payload
                    }else{
                        return expense
                    }
                })
            })
            .addCase(updateExpense.rejected, (state, action) => {
                state.loading = false
                // console.log(action)
            })


            // Delete Expenses 
            .addCase(deleteExpense.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteExpense.fulfilled, (state, action) => {
                state.loading = false;
                state.expenses = state.expenses.filter(expense => expense.id !== action.payload)
                // console.log(action);
            })
            .addCase(deleteExpense.rejected, (state, action) => {
                state.loading = false
                // console.log(action)
            })
    }
})

export default expenseSlice.reducer