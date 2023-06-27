import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

export const signup = createAsyncThunk('auth/signup', async({enteredData}, {rejectWithValue}) => {
    try {
        const res = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_API_KEY }`, {...enteredData, returnSecureToken: true})
        return res.data
    } catch (error) {
        return rejectWithValue(error.response.data.error)
    }
})

export const login = createAsyncThunk('auth/login', async({enteredData}, {rejectWithValue}) => {
    try {
        const res = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_API_KEY }`, {...enteredData, returnSecureToken: true})
        return res.data
    } catch (error) {
        return rejectWithValue(error.response.data.error)
    }
})
const authInitialState = {
    loading: false,
    isLoggedIn: localStorage.getItem('token') ? true : false,
    token: localStorage.getItem('token') ? localStorage.getItem('token') : '',
    email: localStorage.getItem('email') ? localStorage.getItem('email') : ''
}
const authSlice = createSlice({
    name: 'auth',
    initialState: authInitialState,
    reducers: {
        logout(state){
            state.isLoggedIn = false
            state.email = '';
            state.token = '';
            localStorage.removeItem('token')
            localStorage.removeItem('email')
        }
    },
    extraReducers: (builder) => {
        builder
            // Signup 
            .addCase(signup.pending, (state) => {
                state.loading = true
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.loading = false
                state.email = action.payload.email;
                state.token = action.payload.idToken;
                localStorage.setItem('token', action.payload.idToken);
                localStorage.setItem('email', action.payload.email);
            })
            .addCase(signup.rejected, (state, action) => {
                state.loading = false
                console.log(action)
            })
            
            // Login 
            .addCase(login.pending, (state) => {
                state.loading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                console.log(action)
                state.loading = false
                state.isLoggedIn = true
                state.email = action.payload.email;
                state.token = action.payload.idToken;
                localStorage.setItem('token', action.payload.idToken);
                localStorage.setItem('email', action.payload.email);
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false
                console.log(action)
            })
            
    }
})

export const {logout} = authSlice.actions
export default authSlice.reducer