import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userPref } from "../shared/USER_PREFERENCES";
import { useParams } from "react-router-dom";

const TEMPURL = 'http://localhost:3001/users'

const initialState = {
    data: {
        username: '',
        avatar: '',
        preferences: {
            region: userPref.region,
            homepage: userPref.homepage
        }
    },
    isLoading: true,
    errMsg: ''
}

export const fetchUserData = createAsyncThunk(
    'user/fetchUserData',
    async () => {
        const response = await fetch(TEMPURL);
        if (!response.ok) return userPref

        const data = await response.json();
        return data
    }
)

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateRegion: (state, action) => {
            state.data.preferences.region = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserData.pending, (state) => {
                state.isLoading = true;
                state.errMsg = '';
            })
            .addCase(fetchUserData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.errMsg = '';
                state.data.preferences = action.payload.filter((user) => user.username = 'user')[0].preferences
            })
            .addCase(fetchUserData.rejected, (state, action) => {
                state.isLoading = false;
                state.errMsg = action.error ? action.error.message : 'Failed to get user data';
            })
    }
})

export const userReducer = userSlice.reducer;
export const { updateRegion } = userSlice.actions;

export const getUserInfo = (state) => {
    return state.user
}

export const getUserPreferences = (state) => {
    return state.user.data.preferences
}