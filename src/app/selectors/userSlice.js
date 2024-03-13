import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userPref } from "../shared/DEFAULTS";
import { loadUserPreferences } from "./settingsSlice";
import { SERVER_URL } from "../shared/DEFAULTS";

// const TEMPURL = 'http://localhost:3002/user'
const TEMP_LOGIN_URL = 'http://localhost:3002/'

const initialState = {
    data: {
        username: '',
        avatar: '',
        preferences: {
            region: userPref.region,
            homepage: userPref.homepage
        }
    },
    userState: {
        loggedIn: false,
        userLoading: false,
        success: false
    },
    dataState: {
        isLoading: false,
        success: false,
        errMsg: ''
    },
    saveState: {
        isSaved: true,
        isSaving: false,
        success: false,
        status: ''
    },
}

export const attemptLogin = createAsyncThunk(
    'user/attemptLogin',
    async (userInfo, { dispatch }) => {
        const request = {
            request: 'LOGIN',
            data:{...userInfo},
        }
        try {
            const response = await fetch(
                SERVER_URL + '/login',
                {
                    method: 'POST',
                    body: JSON.stringify(request),
                    headers: { 'Content-Type': 'application/json' }
                }
            );
            if (!response.ok) {
                console.log('Bad response attempting Login')
                return Promise.reject('Login Failed');
            }
            const data = await response.json();
            if (data.validated) {
                dispatch(fetchUserSettings(data));
                return data;
            } else {
                return Promise.reject('Login Failed');
            };

        } catch (e) {
            console.log('An Error Occured:', e);
            return Promise.reject('No user found');

        }
        // const sleep = async (ms) => {
        //     return new Promise((resolve) => { setTimeout(resolve, ms) })
        // }
        // await sleep(2000);
        // // return new Promise.reject('Login failed')
        // dispatch(fetchUserSettings({ username: 'user' }));
        // return { username: 'user' }
    }
)
export const fetchUserSettings = createAsyncThunk(
    'user/fetchUserSettings',
    async (userInfo) => {
        const request = {
            request:'GET-SETTINGS',
            data: {...userInfo}
        }
        try {
            const response = await fetch(
                SERVER_URL + '/user',
                {
                    method: 'POST',
                    body: JSON.stringify(request),
                    headers: { 'Content-Type': 'application/json' }
                }
            );
            if (!response.ok) {
                return Promise.reject('Failed to get user preferences');
            }
            const data = await response.json();
            return data

        } catch (e) {
            console.log('Error fetching user preferences: ')
            return Promise.reject('Failed to get user preferences');
        }
        // const sleep = async (ms) => {
        //     return new Promise((resolve) => { setTimeout(resolve, ms) })
        // }
        // await sleep(2000);
        // // return new Promise.reject('Failed to get preferences')
        // return {
        //     data: {
        //         username: 'THIS USER',
        //         avatar: '',
        //         preferences: {
        //             region: userPref.region,
        //             homepage: userPref.homepage
        //         }
        //     }
        // }
    }
)
export const postUserSettings = createAsyncThunk(
    'user/postUserSettings',
    async (settings, { dispatch }) => {
        const userName = settings.username.toLowerCase();
        const request = {
            request: 'UPDATE-SETTINGS',
            data: {...settings}
        }

        const response = await fetch(
            SERVER_URL + '/user',
            {
                method: 'PUT',
                body: JSON.stringify(request),
                headers: { 'Content-Type': 'application/json' }
            }
        )
        if (!response.ok) return Promise.reject(response.status);
        const data = await response.json();
        dispatch(loadUserPreferences( data ));
    }
)



const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateIsSaved: (state, action) => {
            state.saveState.isSaved = action.payload;
            state.saveState.success = action.payload;
        },
        logOutUser: (state, action) => {
            state.data = initialState.data
            state.userState = initialState.userState
            state.dataState = initialState.dataState
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(attemptLogin.pending, (state) => {
                state.userState.userLoading = true;
                state.userState.success = false;
            })
            .addCase(attemptLogin.fulfilled, (state, action) => {
                state.userState.loggedIn = true;
                state.userState.userLoading = false;
                state.userState.success = true;
                state.data.username = action.payload.username
                // console.log('The user is: ', action.payload.username)
            })
            .addCase(attemptLogin.rejected, (state, action) => {
                state.userState.loggedIn = false;
                state.userState.userLoading = false;
                state.userState.success = false
                state.errMsg = action.error ? action.error.message : 'Login attempt failed'
            })
            //Fetch User Settings:
            .addCase(fetchUserSettings.pending, (state) => {
                state.dataState.isLoading = true;
                state.dataState.success= false;
                state.dataState.errMsg = '';
            })
            .addCase(fetchUserSettings.fulfilled, (state, action) => {
                state.dataState.isLoading = false;
                state.dataState.success = true;
                state.dataState.errMsg = '';
                state.data = action.payload.data
                // console.log('User data received: ', action.payload.data)
            })
            .addCase(fetchUserSettings.rejected, (state, action) => {
                state.dataState.isLoading = false;
                state.dataState.success = false;
                state.dataState.errMsg = action.error ? action.error.message : 'Failed to get user data';
                state.data.preferences = userPref;
                // console.log('Fetch data rejected')
            })
            //POST User Settings
            .addCase(postUserSettings.pending, (state, action) => {
                state.saveState.isSaving = true;
                state.saveState.success = false;
                state.saveState.status = '';

            })
            .addCase(postUserSettings.fulfilled, (state, action) => {
                console.log('Save user preferences success')
                state.saveState.isSaving = false;
                state.saveState.success = true;
                state.saveState.isSaved = true;
                state.saveState.status = '';
            })
            .addCase(postUserSettings.rejected, (state, action) => {
                console.log('Save user preferences failed!\n', action.error ? action.error.message : 'Fetch failed')
                state.saveState.isSaving = false;
                state.saveState.success = false;
                state.saveState.isSaved = false;
                state.saveState.status = 'Save Failed...'
            })
    }
})

export const userReducer = userSlice.reducer;
export const { logOutUser, updateIsSaved } = userSlice.actions;

export const getUserInfo = (state) => {
    return state.user
}

export const getUserPreferences = (state) => {
    return state.user.data.preferences
}