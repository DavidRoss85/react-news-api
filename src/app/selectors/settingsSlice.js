import { createSlice } from "@reduxjs/toolkit";
import { userPref } from "../shared/DEFAULTS";

const initialState = {
    data: {
        username: '',
        avatar: '',
        current: {
            region: userPref.region,
            homepage: userPref.homepage
        }
    },
    isLoaded: false
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
            state.isLoaded=action.payload;
        },
    }
});

export const settingsReducer = settingsSlice.reducer;
export const { changeRegion, loadUserPreferences } = settingsSlice.actions;

export const getCurrentRegion = (state) => {
    return state.settings.data.current.region
}

export const getAppSettings = (state) =>{
    console.log('settings state:', state.settings)
    return state.settings
    
}