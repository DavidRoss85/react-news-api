import { createSlice } from "@reduxjs/toolkit";
import { TEST_NEWS, BREAKING_NEWS_DEMO, EMPTY_NEWS, WORLD_NEWS_DEMO } from "../shared/TEST_NEWS";

const initialState = {
    breakingNews: BREAKING_NEWS_DEMO,
    worldNews: WORLD_NEWS_DEMO,
    customNews: TEST_NEWS,
    emptyNews: EMPTY_NEWS
}

const newsSlice = createSlice({
    name: 'news',
    initialState,
    reducers:{
        reloadNews: (state, action)=>{
            console.log("reloadNews", action.payload);
            state.breakingNews.status = 'ok';
            state.customNews.status = 'ok';
        }
    }
})

export const newsReducer = newsSlice.reducer;
export const {reloadNews} = newsSlice.actions;

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