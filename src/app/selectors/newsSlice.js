import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { EMPTY_NEWS } from "../shared/TEST_NEWS";
import { fetchFromServer } from "./newsAPI";
import { userPref, CACHE_TTE } from "../shared/DEFAULTS";
import { buildNewsURL } from "../../utils/buildNewsUrl";

const initialState = {
    breakingNews:
        userPref.homepage.map((tile) => {
            return {
                news: EMPTY_NEWS,
                isLoading: true,
                errMsg: ''
            }
        }
        ),
    searchResults: [{
        news: EMPTY_NEWS,
        isLoading: true,
        errMsg: '',
        criteria: ''
    }],
    cache: [
        {
            criteria: {},
            results: {},
            timeStamp: ''
        }
    ],
    emptyNews: [EMPTY_NEWS]
}

const EMPTY_CACHE = [
    {
        criteria: {},
        results: {},
        timeStamp: null
    }
]
const extractCacheData = (newsURL, searchCache) => {
    let cacheIndex = null;

    const result = searchCache.find((item, idx) => {
        cacheIndex = idx;
        return item.criteria === newsURL;
    })

    if (result) {
        //If found results in cache
        const timePassed = Date.now() - result.timeStamp
        if (timePassed < CACHE_TTE) { 
            return { newsData: result.results };
        } else {
            return { expired: cacheIndex }
        }
    }
    return null
}

export const fetchBreakingNews = createAsyncThunk(
    'news/fetchBreakingNews',
    async (searchCriteria) => {
        const { id, searchCache = EMPTY_CACHE } = searchCriteria;

        const newsURL = buildNewsURL(searchCriteria);
        const cachedItems = extractCacheData(newsURL, searchCache);

        if (!cachedItems || cachedItems.expired) {
            const newsData = await fetchFromServer(newsURL);
            const dataToCache = {
                criteria: newsURL,
                results: newsData,
                timeStamp: Date.now()
            }
            return newsData.status === 'error' ? { id, newsData } : { id, newsData, cache: dataToCache, ...cachedItems };
        } else {
            console.log('Load Cache')
            return { id, ...cachedItems };
        }
    }
)

export const fetchSearchResults = createAsyncThunk(
    'news/fetchSearchResults',
    async (searchCriteria) => {

        const { id, searchCache = EMPTY_CACHE } = searchCriteria;
        
        const newsURL = buildNewsURL(searchCriteria);
        const cachedItems = extractCacheData(newsURL, searchCache)

        if (!cachedItems || cachedItems.expired) {
            const newsData = await fetchFromServer(newsURL);
            const dataToCache = {
                criteria: newsURL,
                results: newsData,
                timeStamp: Date.now()
            }
            return newsData.status === 'error' ? { id, newsData, criteria: searchCriteria } : { id, newsData, criteria: searchCriteria, cache: dataToCache, ...cachedItems };
        } else {
            console.log('Load Cache')
            return { id, criteria: searchCriteria, ...cachedItems };
        }

    }
)

const newsSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {
        reloadNews: (state, action) => {
            const { id, feed = 'breakingNews' } = action.payload
            const immId = id
            if (id > state[feed].length - 1) {
                state[feed].push({ news: {}, isLoading: true, errMsg: '' })
            } else {
                state[feed][immId].isLoading = true;
            }
        },
        updateFeed: (state, action) => {
            const { feed, id, news } = action.payload;
            state[feed][id] = news;
        },
        emptyCache: (state, action)=>{
            state.cache = EMPTY_CACHE;
        },
        loadLocalCache: (state, action)=>{
            const localCache = sessionStorage.getItem('searchCache');
            if (localCache){
                state.cache = localCache;
            }else {
                state.cache = EMPTY_CACHE;
            }
        },
        saveLocalCache: (state, action)=>{
            sessionStorage.setItem('searchCache', state.cache)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBreakingNews.pending, (state) => {
                // Each component handles its own setting the isLoading status
            })
            .addCase(fetchBreakingNews.fulfilled, (state, action) => {
                const { newsData, id, feed = 'breakingNews', cache, expired } = action.payload;
                //Cache results if possible
                if (cache) {
                    if (expired) {
                        state.cache[expired] = cache
                        console.log('Cache overwrite')
                    } else {
                        state.cache.push(cache);
                        console.log('Cached results.')
                    }
                }
                const immId = id
                if (id > state[feed].length - 1) {
                    state[feed].push({ news: newsData, isLoading: false, errMsg: '' })
                } else {
                    state[feed][immId].isLoading = false;
                    state[feed][immId].errMsg = '';
                    state[feed][immId].news = newsData;
                }
            })
            .addCase(fetchBreakingNews.rejected, (state, action) => {
                //Since API rejects are handled in separate module, this likely won't be called.
                const { id, feed = 'breakingNews' } = action.payload;
                const immId = id
                if (id > state[feed].length - 1) { //Just in case an id outside parameters gets passed
                    state[feed].push({
                        news: EMPTY_NEWS,
                        isLoading: false,
                        errMsg: action.error ? action.error.message : 'Failed'
                    })
                } else {
                    state[feed][immId].isLoading = false;
                    state[feed][immId].errMsg = action.error ? action.error.message : 'Failed'
                }
            })
            .addCase(fetchSearchResults.pending, (state) => {
                state.searchResults[0].isLoading = true;
                state.searchResults[0].criteria = '';
            })
            .addCase(fetchSearchResults.fulfilled, (state, action) => {
                //Cache results if possible
                const { cache } = action.payload
                if (cache) {
                    state.cache.push(cache);
                    console.log('cached results.')
                }
                state.searchResults[0].isLoading = false;
                state.searchResults[0].errMsg = '';
                state.searchResults[0].news = action.payload.newsData
                state.searchResults[0].criteria = action.payload.criteria.keyword
            })
            .addCase(fetchSearchResults.rejected, (state, action) => {
                state.searchResults[0].isLoading = false;
                state.searchResults[0].errMsg = action.error ? action.error.message : 'Search failed'
                state.searchResults[0].criteria = '';
            })
    }

})

export const newsReducer = newsSlice.reducer;
export const { reloadNews, updateFeed, emptyCache, saveLocalCache, loadLocalCache } = newsSlice.actions;

export const getWorldNews = (id) => (state) => {
    const immId = (id > state.news.worldNews.length - 1) ? state.news.worldNews.length - 1 : id;
    return state.news.worldNews[immId];
};

export const getBreakingNews = (id) => (state) => {
    const immId = (id > state.news.breakingNews.length - 1) ? state.news.breakingNews.length - 1 : id;
    return state.news.breakingNews[immId].news;
};
export const getLoadingStatus = (id) => (state) => {
    const immId = (id > state.news.breakingNews.length - 1) ? state.news.breakingNews.length - 1 : id;
    return state.news.breakingNews[immId].isLoading;
};

export const getCustomNews = (id) => (state) => {
    const immId = (id > state.news.customNews.length - 1) ? state.news.customNews.length - 1 : id;
    return state.news.customNews[immId];
};

export const getEmptyNewsArray = (state) => {
    return state.news.emptyNews[0];
}