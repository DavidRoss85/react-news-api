import { createSlice } from "@reduxjs/toolkit";
import { TEST_NEWS, BREAKING_NEWS_DEMO, EMPTY_NEWS, WORLD_NEWS_DEMO } from "../shared/TEST_NEWS";

const initialState = {
    breakingNews: [BREAKING_NEWS_DEMO],
    worldNews: [WORLD_NEWS_DEMO],
    customNews: [
        WORLD_NEWS_DEMO,
        WORLD_NEWS_DEMO,
        BREAKING_NEWS_DEMO,
        TEST_NEWS
    ],
    emptyNews: [EMPTY_NEWS]
}

const newsSlice = createSlice({
    name: 'news',
    initialState,
    reducers:{
        //For testing
        reloadNews: (state, action)=>{
            console.log("reloadNews", action.payload);
            state.breakingNews[0].status = 'ok';
            state.customNews[1].status = 'ok';
        },
        showAllFail: (state, action)=>{
            state.breakingNews[0].status = 'error';
            state.customNews[0].status = 'error';
        },
        testSomething: (state, action)=>{
            state.customNews[1].status='error';
        },
        updateFeed: (state, action)=>{
            const {feed, id, news} = action.payload;
            state[feed][id] = news;
        }
    }
})

export const newsReducer = newsSlice.reducer;
export const {reloadNews, showAllFail, testSomething, updateFeed} = newsSlice.actions;

export const getWorldNews = (id) => (state) => {
    const immId = (id>state.news.worldNews.length-1) ? state.news.worldNews.length-1 : id;
    return state.news.worldNews[immId];
};

export const getBreakingNews = (id) => (state)=> {
    const immId = (id>state.news.breakingNews.length-1) ? state.news.breakingNews.length-1 : id;
    return state.news.breakingNews[immId];
};

export const getCustomNews = (id) => (state)=> {
    const immId = (id>state.news.customNews.length-1) ? state.news.customNews.length-1 : id;
    return state.news.customNews[immId];
};

export const getEmptyNewsArray = (state) =>{
    return state.news.emptyNews[0];
}