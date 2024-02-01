import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { EMPTY_NEWS} from "../shared/TEST_NEWS";
import { fetchFromServer } from "./newsAPI";
import { userPref } from "../shared/DEFAULTS";


const initialState = {
    breakingNews:
        userPref.homepage.map((tile)=>{
            return {
                news: EMPTY_NEWS,
                isLoading: true,
                errMsg: ''
            }
        }
    ),
    searchResults:[{
        news: EMPTY_NEWS,
        isLoading:true,
        errMsg:'',
        criteria: ''
    }],
    emptyNews: [EMPTY_NEWS]
}

export const fetchBreakingNews = createAsyncThunk(
    'news/fetchBreakingNews',
    async (searchCriteria) => {
        const { id } = searchCriteria;
        const newsData = await fetchFromServer(searchCriteria);
        console.log('Fetched news: ', newsData)
        return { id, newsData };
    }
)

export const fetchSearchResults = createAsyncThunk(
    'news/fetchSearchResults',
    async (searchCriteria) => {
        const { id } = searchCriteria;
        const newsData = await fetchFromServer(searchCriteria);
        console.log('Search criteria: ',searchCriteria)
        return { id, newsData,criteria: searchCriteria };
    }
)

const newsSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {
        reloadNews: (state, action) => {
            const { id, feed = 'breakingNews' } = action.payload
            const immId = id//(id > state[feed].length - 1) ? state[feed].length - 1 : id;
            if (id > state[feed].length - 1){
                state[feed].push({news: {}, isLoading:true, errMsg:''})
            }else {
                state[feed][immId].isLoading = true;
            }
        },
        updateFeed: (state, action) => {
            const { feed, id, news } = action.payload;
            state[feed][id] = news;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBreakingNews.pending, (state) => {
                // const { id } = action.payload;
                // state.breakingNews[0].isLoading = true;
            })
            .addCase(fetchBreakingNews.fulfilled, (state, action) => {
                const { newsData, id, feed ='breakingNews' } = action.payload;
                const immId = id//(id > state[feed].length - 1) ? state[feed].length - 1 : id;
                if (id > state[feed].length - 1){
                    state[feed].push({news: newsData, isLoading:false, errMsg:''})
                }else {
                    state[feed][immId].isLoading = false;
                    state[feed][immId].errMsg = '';
                    state[feed][immId].news = newsData;
                }
            })
            .addCase(fetchBreakingNews.rejected, (state, action) => {
                const { id, feed='breakingNews' } = action.payload;
                const immId = id//(id > state[feed].length - 1) ? state[feed].length - 1 : id;
                if (id > state[feed].length - 1){
                    state[feed].push({
                        news:EMPTY_NEWS, 
                        isLoading:false, 
                        errMsg:action.error ? action.error.message : 'Failed'
                    })
                }else {
                    state[feed][immId].isLoading = false;
                    state[feed][immId].errMsg = action.error ? action.error.message : 'Failed'
                }
            })
            .addCase(fetchSearchResults.pending, (state)=>{
                state.searchResults[0].isLoading=true;
                state.searchResults[0].criteria= '';
            })
            .addCase(fetchSearchResults.fulfilled, (state, action)=>{
                state.searchResults[0].isLoading=false;
                state.searchResults[0].errMsg='';
                state.searchResults[0].news = action.payload.newsData
                state.searchResults[0].criteria= action.payload.criteria.keyword
                console.log('Search results logged')
            })
            .addCase(fetchSearchResults.rejected, (state,action)=>{
                state.searchResults[0].isLoading=false;
                state.searchResults[0].errMsg = action.error ? action.error.message : 'Search failed'
                state.searchResults[0].criteria= '';
            })
    }

})

export const newsReducer = newsSlice.reducer;
export const { reloadNews, showAllFail, testSomething, updateFeed } = newsSlice.actions;

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