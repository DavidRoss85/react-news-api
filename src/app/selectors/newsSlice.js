import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { TEST_NEWS, BREAKING_NEWS_DEMO, EMPTY_NEWS, WORLD_NEWS_DEMO } from "../shared/TEST_NEWS";
import { fetchFromServer } from "./newsAPI";



const initialState = {
    breakingNews: [
        {
            news: EMPTY_NEWS,
            isLoading: true,
            errMsg: ''
        }
    ],
    worldNews: [EMPTY_NEWS],
    customNews: [
        WORLD_NEWS_DEMO,
        WORLD_NEWS_DEMO,
        BREAKING_NEWS_DEMO,
        TEST_NEWS
    ],
    emptyNews: [EMPTY_NEWS]
}

export const fetchBreakingNews = createAsyncThunk(
    'news/fetchBreakingNews',
    async (searchCriteria) => {
        const { id } = searchCriteria;
        const newsData = await fetchFromServer(searchCriteria);
        return { id, newsData };
    }
)

const newsSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {
        //For testing
        reloadNews: (state, action) => {
            const { id, feed } = action.payload
            state[feed][id].isLoading = true;

        },
        showAllFail: (state, action) => {
            state.breakingNews.news[0].status = 'error';
            state.customNews[0].status = 'error';
        },
        testSomething: (state, action) => {
            state.customNews[1].status = 'error';
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
                state.breakingNews[0].isLoading = true;
            })
            .addCase(fetchBreakingNews.fulfilled, (state, action) => {
                const { newsData, id } = action.payload;
                state.breakingNews[id].isLoading = false;
                state.breakingNews[id].errMsg = '';
                state.breakingNews[id].news = newsData
            })
            .addCase(fetchBreakingNews.rejected, (state, action) => {
                const { id } = action.payload;
                state.breakingNews[id].isLoading = false;
                state.breakingNews[id].errMsg = action.error ? action.error.message : 'Failed'
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