import { configureStore } from '@reduxjs/toolkit';
import { newsReducer } from './selectors/newsSlice';
import { regionReducer } from '../utils/regionSlice';

export const store = configureStore({
    reducer: {
        news: newsReducer,
        country: regionReducer
    }
})