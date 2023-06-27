import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

// Signup 
export const signup = createAsyncThunk('auth/signup', async({enteredData}, {rejectWithValue}) => {
    try {
        const res = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_API_KEY }`, {...enteredData, returnSecureToken: true})
        return res.data
    } catch (error) {
        return rejectWithValue(error.response.data.error)
    }
});

// Login 
export const login = createAsyncThunk('auth/login', async({enteredData}, {rejectWithValue}) => {
    try {
        const res = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_API_KEY }`, {...enteredData, returnSecureToken: true})
        return res.data
    } catch (error) {
        return rejectWithValue(error.response.data.error)
    }
});

// Reset Passowrd 
export const passwordReset = createAsyncThunk('auth/password_reset', async({email}, {rejectWithValue}) => {
    try {
        const res = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${process.env.REACT_APP_FIREBASE_API_KEY }`, {
            requestType:"PASSWORD_RESET",
            email:email
        })
        return res.data
    } catch (error) {
        return rejectWithValue(error.response.data.error)
    }
});
// Update Profile 
export const updateProfile = createAsyncThunk('auth/update_profile', async({enteredData}, {rejectWithValue}) => {
    try {
        const res = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${process.env.REACT_APP_FIREBASE_API_KEY }`, {
            ...enteredData,
            returnSecureToken: true
        })
        return res.data
    } catch (error) {
        return rejectWithValue(error.response.data.error)
    }
});

// Get Profile Data 
export const getProfileData = createAsyncThunk('auth/get_profile_data', async({token},{rejectWithValue}) => {
    try{
        const res = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${process.env.REACT_APP_FIREBASE_API_KEY }`, {
            idToken: token
            })
            return res.data
    }catch(error){
        console.log(rejectWithValue(error.response.data.errors))
    }
});

const authInitialState = {
    loading: false,
    error: '',
    isLoggedIn: localStorage.getItem('token') ? true : false,
    token: localStorage.getItem('token') ? localStorage.getItem('token') : '',
    email: localStorage.getItem('email') ? localStorage.getItem('email') : '',
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
                state.isLoggedIn = true
                state.email = action.payload.email;
                state.token = action.payload.idToken;
                localStorage.setItem('token', action.payload.idToken);
                localStorage.setItem('email', action.payload.email);
            })
            .addCase(signup.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload.message;
                // console.log(action)
            })
            
            // Login 
            .addCase(login.pending, (state) => {
                state.loading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false
                state.isLoggedIn = true
                state.email = action.payload.email;
                state.token = action.payload.idToken;
                localStorage.setItem('token', action.payload.idToken);
                localStorage.setItem('email', action.payload.email);
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload.message;
                // console.log(action)
            })

            // Password Reset
            .addCase(passwordReset.pending, (state) => {
                state.loading = true
            })
            .addCase(passwordReset.fulfilled, (state, action) => {
                state.loading = false
                // console.log(action)
            })
            .addCase(passwordReset.rejected, (state, action) => {
                state.loading = false
                // console.log(action)
            })
            
            // Update Profile
            .addCase(updateProfile.pending, (state) => {
                state.loading = true
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.loading = false
                // console.log(action)
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.loading = false
                // console.log(action)
            })
            
            // Get Profile Data
            .addCase(getProfileData.pending, (state) => {
                state.loading = true
            })
            .addCase(getProfileData.fulfilled, (state, action) => {
                state.loading = false
                // console.log(action)
            })
            .addCase(getProfileData.rejected, (state, action) => {
                state.loading = false
                // console.log(action)
            })
            
    }
})

export const {logout} = authSlice.actions
export default authSlice.reducer