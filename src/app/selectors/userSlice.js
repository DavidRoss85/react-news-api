import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import { userPref } from "../shared/DEFAULTS";
import { loadUserPreferences } from "./settingsSlice";
import { SERVER_URL } from "../config";

// const TEMPURL = 'http://localhost:3002/user'
const TEMP_LOGIN_URL = 'http://localhost:3002/'

const initialState = {
    session: {
        accessToken: null,
    },
    data: {
        username: '',
        displayname: '',
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
    userExists: {
        isUpdated: false,
        isLoading: false,
        success: false,
        available: false,
    },
    signUp: {
        isLoading: false,
        success: false,
        result: '',
        message: '',
    },
}

export const attemptLogin = createAsyncThunk(
    'user/attemptLogin',
    async (userInfo, { dispatch }) => {
        const request = {
            request: 'LOGIN',
            ...userInfo,
        }
        try {
            const response = await fetch(
                SERVER_URL + '/users/login',
                {
                    method: 'POST',
                    body: JSON.stringify(request),
                    headers: { 'Content-Type': 'application/json' }
                }
            );
            if (!response.ok) {
                const data = await response.json();
                // console.log('Bad response attempting Login: ')
                return Promise.reject(data.message);
            };

            const data = await response.json();
            if (data.validated === true) {
                dispatch(fetchUserSettings(data));
                return data;
            } else {
                return Promise.reject('Login Failed');
            };

        } catch (e) {
            console.error('attemptLogin:\n','An error occured trying to contact the server:\n', e.message);
            return Promise.reject('Error Contacting Server');

        };

    }
);
export const postSignup = createAsyncThunk(
    'user/postSignup',
    async (userInfo, { dispatch }) => {
        try{
            const response = await fetch(
                SERVER_URL + '/users/signup',
                {
                    method: 'POST',
                    body: JSON.stringify(userInfo),
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            );
            // console.log('Server response:',await response.json());
            if (!response.ok) {
                const data = await response.json();
                return Promise.reject(data.message);
            }
            const data = await response.json();
            return data;

        }catch(e){
            console.error('postSignup:\n','An error occured trying to while trying to contact the server:\n' ,e.message)
            return Promise.reject('An error occured trying to while trying to contact the server');
        }
    }
)

export const fetchUserSettings = createAsyncThunk(
    'user/fetchUserSettings',
    async (userInfo, { dispatch }) => {
        const { accessToken, username, displayname } = userInfo;
        const request = {
            request: 'GET-SETTINGS',
            data: { ...userInfo }
        };
        try {
            const response = await fetch(
                SERVER_URL + '/users/settings',
                {
                    method: 'GET',
                    // body: JSON.stringify(request),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`
                    }
                }
            );
            if (!response.ok) {
                const data = await response.json();
                console.log('Bad response getting Preferences: ', data.message)
                return Promise.reject(data.message || 'Failed to get user preferences');
            };
            const data = await response.json();
            return data

        } catch (e) {
            console.error('fetchUserSettings:\n','An error occured trying to while trying to contact the server:\n' ,e.message)
            return Promise.reject('An error occured trying to while trying to contact the server');
        };

    }
)
export const postUserSettings = createAsyncThunk(
    'user/postUserSettings',
    async (settings, { dispatch }) => {
        const { accessToken, ...rest } = settings;
        const request = {
            request: 'UPDATE-SETTINGS',
            data: {...rest}
        }
        try{
            const response = await fetch(
                SERVER_URL + '/users/settings',
                {
                    method: 'PUT',
                    body: JSON.stringify(request),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`
                    }
                }
            )
            if (!response.ok) return Promise.reject(response.status);
            const data = await response.json();
            dispatch(loadUserPreferences(data));

        }catch(e){
            console.error('postUserSettings:\n','An error occured trying to while trying to contact the server:\n' ,e.message)
            return Promise.reject('An error occured trying to while trying to contact the server');
        }
    }
)
export const queryUsername = createAsyncThunk(
    'user/queryUsername',
    async (username) => {
        try{
            const response = await fetch(
                SERVER_URL + '/users/queryusername/' + username,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            )
            if (!response.ok) return Promise.reject(response.status);
            const data = await response.json();
            return data;
        }catch(e){
            console.error('queryUsername:\n' ,'An error occured trying to while trying to contact the server:\n',e.message)
            return Promise.reject('An error occured trying to while trying to contact the server');
        }
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
        },
        keepUserSession: (state, action) => {
            const currentState = (current(state));
            const updatedState = { ...currentState, ...action.payload };
            const dataToStore = JSON.stringify(updatedState);
            sessionStorage.setItem(`userSession`, dataToStore);
            // console.log('store session: ',dataToStore)
        },
        getUserSession: (state, action) => {
            const localSession = sessionStorage.getItem(`userSession`);
            if (localSession) {
                const parsedData = JSON.parse(localSession);
                const { session, data, userState, dataState, saveState } = parsedData;
                state.session = session;
                state.data = data;
                state.userState = userState;
                state.dataState = dataState;
                state.saveState = saveState;
                // console.log('get session: ', parsedData)
            } else {
                // state = initialState;
            };
        },
        clearUserSession: (state, action) => {
            sessionStorage.setItem(`userSession`, '')
        },
        clearQueryUsername: (state, action) => {
            state.userExists = initialState.userExists;
        },
        resetSignUpVariables: (state, action) => {
            state.signUp = initialState.signUp;
            state.userExists = initialState.userExists;
        },
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
                state.data.username = action.payload.username;
                state.data.displayname = action.payload.displayname;
                state.dataState.errMsg = 'Not Logged in...'
                state.session.accessToken = action.payload.accessToken;
                // console.log('The user is: ', action.payload.username)
            })
            .addCase(attemptLogin.rejected, (state, action) => {
                state.userState.loggedIn = false;
                state.userState.userLoading = false;
                state.userState.success = false
                state.dataState.errMsg = action.error ? action.error.message : 'Login attempt failed'
            })
            //Fetch User Settings:
            .addCase(fetchUserSettings.pending, (state) => {
                state.dataState.isLoading = true;
                state.dataState.success = false;
                state.dataState.errMsg = 'User preferences not loaded';
            })
            .addCase(fetchUserSettings.fulfilled, (state, action) => {
                state.dataState.isLoading = false;
                state.dataState.success = true;
                state.dataState.errMsg = '';
                state.data = { ...state.data, ...action.payload.data };
                // console.log('User data received: ', action.payload.data)
            })
            .addCase(fetchUserSettings.rejected, (state, action) => {
                state.dataState.isLoading = false;
                state.dataState.success = false;
                state.dataState.errMsg = action.error ? action.error.message : 'Your preferences could not be loaded at this time';
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
            //POST Signup
            .addCase(postSignup.pending, (state, action) => {
                state.signUp.isLoading = true;
                state.signUp.success = false;
                state.signUp.message = '';

            })
            .addCase(postSignup.fulfilled, (state, action) => {
                state.signUp.isLoading = false;
                state.signUp.success = true;
                state.signUp.result = action.payload.result;
                state.signUp.message = action.payload.message;
            })
            .addCase(postSignup.rejected, (state, action) => {
                state.signUp.isLoading = false;
                state.signUp.success = false;
                // console.log('Payload',action)
                state.signUp.message = action.error? action.error.message : 'There was an issue creating your account';
            })
            //Query Username
            .addCase(queryUsername.pending, (state, action) => {
                state.userExists.isUpdated = false;
                state.userExists.isLoading = true;
                state.userExists.success = false;
                state.userExists.available = false;

            })
            .addCase(queryUsername.fulfilled, (state, action) => {
                state.userExists.isUpdated = true;
                state.userExists.isLoading = false;
                state.userExists.success = true;
                state.userExists.available = action.payload.result;
            })
            .addCase(queryUsername.rejected, (state, action) => {
                state.userExists.isUpdated = false;
                state.userExists.isLoading = false;
                state.userExists.success = false;
                state.userExists.available = false;
            })
    }
})

export const userReducer = userSlice.reducer;
export const {
    logOutUser,
    updateIsSaved,
    keepUserSession,
    getUserSession,
    clearUserSession,
    clearQueryUsername,
    resetSignUpVariables,
} = userSlice.actions;

export const getUserInfo = (state) => {
    return state.user
}

export const getUserPreferences = (state) => {
    return state.user.data.preferences
}