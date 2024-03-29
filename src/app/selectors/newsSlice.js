import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchFromServer } from "../../utils/newsFetch";
import { userPref, EMPTY_NEWS } from "../shared/DEFAULTS";
import { buildNewsURL } from "../../utils/buildNewsUrl";
import { addToCache, compressURL, saveLocalCache } from "./cacheSlice";
import { extractCacheData } from "./cacheSlice";

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
    emptyNews: [EMPTY_NEWS]
}

const EMPTY_CACHE = [
    {
        criteria: {},
        results: {},
        timeStamp: null
    }
]


export const fetchBreakingNews = createAsyncThunk(
    'news/fetchBreakingNews',
    async (searchCriteria, { dispatch }) => {

        const {errorMode, id, searchCache = EMPTY_CACHE, ...rest } = searchCriteria;
        const searchRequest = {request:'search', data: {...rest}};

        //This built URL will be used for local caching
        const newsURL = buildNewsURL(searchCriteria);
        const cachedItems = extractCacheData(newsURL, searchCache.history, searchCache.data);
        
        if (!cachedItems || cachedItems.expired) {

            const newsData = await fetchFromServer(searchRequest);

            const dataToCache = {
                criteria: compressURL(newsURL),
                results: newsData,
                timeStamp: Date.now()
            }
            console.log('\n***\nGetting news from server. Status:', newsData.status)
            if (newsData.status !== 'error') {
                dispatch(addToCache({ cache: { ...dataToCache }, ...cachedItems }))
                dispatch(saveLocalCache({ dataToCache }))
            }
            return { id, newsData };
        } else {
            console.log('Loading results from local Cache')

            return { id, ...cachedItems };
        }
    }
)

export const fetchSearchResults = createAsyncThunk(
    'news/fetchSearchResults',
    async (searchCriteria, { dispatch }) => {

        const {errorMode, id, searchCache = EMPTY_CACHE, ...rest } = searchCriteria;
        const searchRequest = {request:'search', data: {...rest}};

        const newsURL = buildNewsURL(searchCriteria);
        const cachedItems = extractCacheData(newsURL, searchCache.history, searchCache.data);

        if (!cachedItems || cachedItems.expired) {
            const newsData = await fetchFromServer(searchRequest);
            const dataToCache = {
                criteria: compressURL(newsURL),
                results: newsData,
                timeStamp: Date.now()
            }
            console.log('\n***\nGetting news from server ', newsData.status)
            if (newsData.status !== 'error') {
                dispatch(addToCache({ cache: { ...dataToCache }, ...cachedItems }))
                dispatch(saveLocalCache({ dataToCache }))
            }
            return { id, newsData, criteria: searchCriteria };
        } else {
            console.log('Getting news from local cache')

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
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBreakingNews.pending, (state) => {
                // Each component handles its own setting the isLoading status
            })
            .addCase(fetchBreakingNews.fulfilled, (state, action) => {
                const { newsData, id, feed = 'breakingNews'} = action.payload;
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
                //This code is left commented out just in case.
                // const { id, feed = 'breakingNews' } = action.payload;
                // const immId = id
                // if (id > state[feed].length - 1) { //Just in case an id outside parameters gets passed
                //     state[feed].push({
                //         news: EMPTY_NEWS,
                //         isLoading: false,
                //         errMsg: action.error ? action.error.message : 'Failed'
                //     })
                // } else {
                //     state[feed][immId].isLoading = false;
                //     state[feed][immId].errMsg = action.error ? action.error.message : 'Failed'
                // }
            })
            .addCase(fetchSearchResults.pending, (state) => {
                state.searchResults[0].isLoading = true;
                state.searchResults[0].criteria = '';
            })
            .addCase(fetchSearchResults.fulfilled, (state, action) => {
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
export const { reloadNews, updateFeed } = newsSlice.actions;

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