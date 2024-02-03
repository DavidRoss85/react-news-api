import { createSlice } from "@reduxjs/toolkit";
import { userPref } from "../shared/DEFAULTS";
import { useDispatch } from 'react-redux';
import { reloadNews, fetchBreakingNews } from "./newsSlice";
import { EMPTY_NEWS } from "../shared/TEST_NEWS";
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
            state.data.preferences.homepage.map((page, idx) => {
                if(!page.search) return
                console.log('Change region: ', action.payload)
                if (page.search.country === 'default') {
                    console.log('changed #' + page.id)
                    state.data.current.homepage[idx].search.country = action.payload
                }
            })


        },
        loadUserPreferences: (state, action) => {
            //copies the preferences then if the country is set to 'default', change it to the current region.
            const { data } = action.payload
            state.data = { ...data, current: { ...data.preferences } }
            state.data.current.homepage = state.data.current.homepage.map((page, idx) => {
                if(!page.search){
                    return {
                        id: idx
                    }
                } 
                const {country} = page.search;
                const immCountry = (country === 'default') ? state.data.current.region : country
                const immPage = {...page, search: {...page.search,country: immCountry}};
                return immPage
            })
            state.isLoaded = true;
        },
    }
});

export const settingsReducer = settingsSlice.reducer;
export const { changeRegion, loadUserPreferences } = settingsSlice.actions;

export const getCurrentRegion = (state) => {
    return state.settings.data.current.region
}

export const getAppSettings = (state) => {
    // console.log('settings state:', state.settings)
    return state.settings

}