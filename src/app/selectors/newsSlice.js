import { createSlice } from "@reduxjs/toolkit";
import { TEST_NEWS, WORLD_NEWS_DEMO, BREAKING_NEWS_DEMO, EMPTY_NEWS } from "../shared/TEST_NEWS";

const initialState = {
    breakingNews: TEST_NEWS,
    worldNews: WORLD_NEWS_DEMO,
    customNews: TEST_NEWS
}

const newsSlice = createSlice({
    name: 'news',
    initialState,
    reducers:{
        reloadNews: (state, action)=>{
            console.log("reloadNews", action.payload);
            state.breakingNews.status = 'ok';
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
