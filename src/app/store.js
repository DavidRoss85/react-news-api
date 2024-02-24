import { configureStore } from '@reduxjs/toolkit';
//import logger from 'redux-logger';
import { newsReducer } from './selectors/newsSlice';
import { settingsReducer } from './selectors/settingsSlice';
import { userReducer } from './selectors/userSlice';
import { cacheReducer } from './selectors/cacheSlice';

//Testing custom middleware
const logMiddleMessage = (store) => (next) => (action) => {
    if (action.type === 'news/fetchBreakingNews/fulfilled') {
        console.log('STORE', store);
        console.log('NEXT', next);
        console.log('ACTION', action);
    }
    return next(action);

};

export const store = configureStore({
    reducer: {
        news: newsReducer,
        settings: settingsReducer,
        user: userReducer,
        cache: cacheReducer,
    },
    //middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([logMiddleMessage])
})

