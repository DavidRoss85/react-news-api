import { configureStore } from '@reduxjs/toolkit';
import { newsReducer } from './selectors/newsSlice';

export const store = configureStore({
    reducer: {
        news: newsReducer
    }
})