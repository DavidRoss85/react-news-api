import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    code: 'all'
}

const regionSlice = createSlice({
    name: 'country',
    initialState,
    reducers: {
        changeRegion: (region, action) =>{
            region.code = action.payload;
        }
    }
});

export const regionReducer = regionSlice.reducer;
export const { changeRegion } = regionSlice.actions;

export const getCurrentRegion = (state) =>{
    console.log('Region:',state.country.code)
    return state.country.code
}