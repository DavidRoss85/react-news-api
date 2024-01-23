import { configureStore } from '@reduxjs/toolkit';
import { newsReducer } from './selectors/newsSlice';
import { settingsReducer } from './selectors/settingsSlice';
import { userReducer } from './selectors/userSlice';
import { cacheReducer } from './selectors/cacheSlice';

export const store = configureStore({
    reducer: {
        news: newsReducer,
        settings: settingsReducer,
        user: userReducer,
        cache: cacheReducer
    }
})