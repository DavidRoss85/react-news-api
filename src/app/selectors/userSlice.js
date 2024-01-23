import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userPref } from "../shared/DEFAULTS";
import { useParams } from "react-router-dom";

const TEMPURL = 'http://localhost:3001/usaers'

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
    fetchComplete:false,
    errMsg: ''
}

export const fetchUserData = createAsyncThunk(
    'user/fetchUserData',
    async () => {
        const response = await fetch(TEMPURL);
        if (!response.ok) {
            return Promise.reject('Failed to get user preferences');
        }

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
                state.fetchComplete=false;
                state.errMsg = '';
            })
            .addCase(fetchUserData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.fetchComplete=true;
                state.errMsg = '';
                //replace this with the filter for the currently logged in user
                state.data = action.payload.filter((user) => user.username = 'user')[0]
                console.log(action.payload.filter((user) => user.username = 'user')[0])
            })
            .addCase(fetchUserData.rejected, (state, action) => {
                state.isLoading = false;
                state.fetchComplete=true;
                state.errMsg = action.error ? action.error.message : 'Failed to get user data';
                state.data.preferences = userPref;
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