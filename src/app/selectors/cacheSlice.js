import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    searches: [
        {
            criteria:{},
            results:{},
            timeStamp:''
        }
    ],
    isLoading: true,
    errMsg:''
}

const cacheSlice = createSlice({
    name: 'cache',
    initialState,
    reducers: {
        addToCache: (state, action)=>{
            state.searches.push(action.payload);
        }
    }
})

export const cacheReducer = cacheSlice.reducer;

export const checkCache = (searchCriteria)=> (state) =>{
    return state.cache.searches.find((item)=>item.criteria===searchCriteria)
}