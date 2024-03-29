import { createSlice } from "@reduxjs/toolkit";
import { userPref } from "../shared/DEFAULTS";

const initialState = {
    data: {
        username: '',
        displayname: '',
        avatar: '',
        current: {
            region: userPref.region,
            homepage: userPref.homepage
        }
    },
    isLoaded: false
};

const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        changeRegion: (state, action) => {
            state.data.current.region = action.payload;
            state.data.preferences.homepage.map((page, idx) => {
                if(!page.search) return page
                if (page.search.country === 'all') {
                    state.data.current.homepage[idx].search.country = action.payload
                }
                return page;
            })


        },
        loadUserPreferences: (state, action) => {
            //copies the preferences then if the country is set to 'all', change it to the current region.
            const { data } = action.payload
            state.data = { ...data, current: { ...data.preferences } }
            state.data.current.homepage = state.data.current.homepage.map((page, idx) => {
                if(!page.search){
                    return {
                        id: idx
                    }
                } 
                const {country} = page.search;
                const immCountry = (country === 'all') ? state.data.current.region : country
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
    return state.settings

}