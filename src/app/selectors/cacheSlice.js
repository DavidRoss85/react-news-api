import { createSlice, current } from "@reduxjs/toolkit";
import { EMPTY_CACHE } from "../shared/DEFAULTS";
import { CACHE_TTL } from "../config";

//history contains the search string 
//which will match the position of the item in data.
//The first array position for the search cache is reserved.
const initialState = {
    history: ['ReservedSpot'],
    data: [
        {
            criteria: 'Empty',
            results: {},
            timeStamp: '',
        }
    ],
    didInitialize: false,
    isLoading: true,
    errMsg: ''
}

export const extractCacheData = (newsURL, searchHistory, searchData) => {
    //newsURL is the search criteria
    //searchHistory is an array with past search criterias
    //searchCache is an array containing objects with timestamps and results.
    const cacheIndex = searchHistory.findIndex((item) => {
        return item === compressURL(newsURL)
    })

    if (cacheIndex === -1) {
        return null
    } else {
        const timePassed = Date.now() - searchData[cacheIndex].timeStamp
        if (timePassed < CACHE_TTL) {
            return { newsData: searchData[cacheIndex].results };
        } else {
            return { expired: cacheIndex }
        }
    }

}

export const compressURL = (newsURL) => {
    return newsURL.slice(23);
}

const cacheSlice = createSlice({
    name: 'cache',
    initialState,
    reducers: {
        addToCache: (state, action) => {
            const { expired, cache } = action.payload;
            if (expired) {
                state.history[expired] = cache.criteria;
                state.data[expired] = cache;
                console.log('Updating expired entry')
            } else {
                state.history.push(cache.criteria);
                state.data.push(cache);
                console.log('Results added to cache')
            }
            // console.log('This state is being accessed in addToCache: ')
        },
        emptyCache: (state, action) => {
            state = EMPTY_CACHE;
            localStorage.clear();
            console.log('Cache cleared successfully')
        },
        loadLocalCache: (state, action) => {
            // return
            for (let i = 0; i < localStorage.length; i++) {
                const localKey = (localStorage.key(i));
                // console.log(`Loaded ${localKey} into memory`)
                const localData = localStorage.getItem(localKey);
                // console.log('localData: ', localData)
                if(localData){
                    const parsedData = JSON.parse(localData);
                    state.history.push(parsedData.criteria)
                    state.data.push(parsedData)
                };
                console.log('\n***\nCache loaded from local storage:', localStorage.length, 'entries.\n***')
                // console.log('Data: ', localStorage.key(i))
            }
            state.didInitialize=true;
        },
        saveLocalCache: (state, action) => {
            localStorage.clear();
            for(let item of current(state.data)){
                const dataToStore = JSON.stringify(item);
                localStorage.setItem(`${item.criteria}`, dataToStore);
            }
            console.log(`Cache saved to local storage. ${localStorage.length} total entries in storage.\n***`)// console.log(localStorage.length)
        }
    }
})

export const cacheReducer = cacheSlice.reducer;
export const { addToCache, emptyCache, saveLocalCache, loadLocalCache } = cacheSlice.actions;

export const checkCache = (searchCriteria) => (state) => {
    const result = state.cache.searches.find((item) => item.criteria === searchCriteria)
    if (result) {
        //No longer used
        // console.log('Cache found. No search performed.');
        // console.log('New search: ', searchCriteria);
        // console.log('Cached search: ', result)
        return true;
    }
}