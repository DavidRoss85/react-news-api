import { createSlice } from "@reduxjs/toolkit";
import { TEST_NEWS, BREAKING_NEWS_DEMO, EMPTY_NEWS, WORLD_NEWS_DEMO } from "../shared/TEST_NEWS";

const initialState = {
    breakingNews: BREAKING_NEWS_DEMO,
    worldNews: WORLD_NEWS_DEMO,
    customNews: WORLD_NEWS_DEMO,
    emptyNews: EMPTY_NEWS
}

const newsSlice = createSlice({
    name: 'news',
    initialState,
    reducers:{
        //For testing
        reloadNews: (state, action)=>{
            console.log("reloadNews", action.payload);
            state.breakingNews.status = 'ok';
            state.customNews.status = 'ok';
        },
        showAllFail: (state, action)=>{
            state.breakingNews.status = 'error';
            state.customNews.status = 'error';
        }
    }
})

export const newsReducer = newsSlice.reducer;
export const {reloadNews, showAllFail} = newsSlice.actions;

export const getWorldNews = ({ numArticles }) => (state) => {
    return state.news.worldNews;
};

export const getBreakingNews = ({ numArticles }) => (state)=> {
    return state.news.breakingNews;
};

export const getCustomNews = () => (state)=> {
    return state.news.customNews;
};

export const getEmptyNewsArray = (state) =>{
    return state.news.emptyNews;
}