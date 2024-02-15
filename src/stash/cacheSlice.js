//This is no longer needed
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    searches: [
        {
            criteria: {},
            results: {},
            timeStamp: ''
        }
    ],
    isLoading: true,
    errMsg: ''
}

const cacheSlice = createSlice({
    name: 'cache',
    initialState,
    reducers: {
        addToCache: (state, action) => {
            state.searches.push(action.payload);
        }
    }
})

export const cacheReducer = cacheSlice.reducer;
//export const { addToCache } = cacheSlice.actions

export const checkCache = (searchCriteria) => (state) => {
    const result = state.cache.searches.find((item) => item.criteria === searchCriteria)
    if (result){
        console.log('Cache found. No search performed.');
        console.log('New search: ', searchCriteria);
        console.log('Cached search: ', result)
        return true;
    }
}