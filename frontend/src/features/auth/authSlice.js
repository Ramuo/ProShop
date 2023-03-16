import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import authService from './authService';

// I - Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'))

// Auth Global State
const initialState = {
    user: user? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''

}

// II - ACTIONS: 
// 1 - Register new user
export const register = createAsyncThunk('auth/register', 
async(user, thunkAPI) =>{
    try {
        return await authService.register(user)
    } catch (error) {
        const message = 
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString();

        return thunkAPI.rejectWithValue(message)  
    }
});

// 2 - Login user
export const login = createAsyncThunk('auth/login', 
async(user, thunkAPI) => {
    try {
        return await authService.login(user)
    } catch (error) {
        const message = 
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
});

// 3 - Logout user
export const logout = createAsyncThunk('auth/logout', 
async () => {
    return await authService.logout();
});

// 4 - Update user profile
export const updateUserProfile = createAsyncThunk('auth/updateUserProfile', 
async(userData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await authService.updateUserProfile(userData, token);
    } catch (error) {
        const message = 
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString()

        return thunkAPI.rejectWithValue(message)
    }
});

// III - REDUCERS
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload 
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.user = null
            })
            .addCase(updateUserProfile.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateUserProfile.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(updateUserProfile.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })
    }

});


export const {reset} = authSlice.actions
export default authSlice.reducer
