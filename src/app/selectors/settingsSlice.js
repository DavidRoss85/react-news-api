import { createSlice } from "@reduxjs/toolkit";
import { userPref } from "../shared/USER_PREFERENCES";

const initialState = {
    data: {
        username: '',
        avatar: '',
        current: {
            region: userPref.region,
            homepage: userPref.homepage
        }
    }
}

const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        changeRegion: (state, action) => {
            state.data.current.region = action.payload;
        },
        loadUserPreferences: (state, action) => {
            state.data = { ...action.payload.data, current: action.payload.data.preferences }
        }
    }
});

export const settingsReducer = settingsSlice.reducer;
export const { changeRegion, loadUserPreferences } = settingsSlice.actions;

export const getCurrentRegion = (state) => {
    return state.settings.data.current.region
}

export const getAppSettings = (state) =>{
    return state.settings
}