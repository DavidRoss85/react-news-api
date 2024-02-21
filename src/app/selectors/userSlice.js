import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userPref } from "../shared/DEFAULTS";
import { loadUserPreferences } from "./settingsSlice";

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
    // isLoading: true,
    // fetchComplete: false,
    // errMsg: ''
}

export const attemptLogin = createAsyncThunk(
    'user/attemptLogin',
    async (userInfo) => {
        try {
            const response = await fetch(TEMP_LOGIN_URL + userInfo.username);
            if (!response.ok) {
                console.log('Bad response getting user')
                return Promise.reject('No user found');
            }
            const data = await response.json();
            return data
        } catch (e) {
            console.log('Error getting user')
            return Promise.reject('No user found');
        }
    }
)

export const postSettings = createAsyncThunk(
    'user/postSettings',
    async (settings, {dispatch}) =>{
        const userName = settings.username.toLowerCase()
        const response = await fetch(
            TEMP_LOGIN_URL + userName, 
            { 
                //GET, PUT, POST, DELETE
                method: 'PUT', //will replace
                body: JSON.stringify(settings),
                headers: {'Content-Type': 'application/json'}
            }
        )
        if(!response.ok) return Promise.reject(response.status);
        const data = await response.json();
        dispatch(loadUserPreferences({data}));
    }
)

// export const fetchUserData = createAsyncThunk(
//     'user/fetchUserData',
//     async () => {
//         try {
//             const response = await fetch(TEMPURL);
//             if (!response.ok) {
//                 return Promise.reject('Failed to get user preferences');
//             }
//             const data = await response.json();
//             return data

//         } catch (e) {
//             console.log('Error fetching user preferences: ')
//             return Promise.reject('Failed to get user preferences');
//         }
//     }
// )

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // updateRegion: (state, action) => {
        //     state.data.preferences.region = action.payload
        // },
        logOutUser: (state, action) => {
            state.data = initialState.data
            state.userState=initialState.userState
        }
    },
    extraReducers: (builder) => {
        builder
            // .addCase(fetchUserData.pending, (state) => {
            //     state.isLoading = true;
            //     state.fetchComplete = false;
            //     state.errMsg = '';
            // })
            // .addCase(fetchUserData.fulfilled, (state, action) => {
            //     state.isLoading = false;
            //     state.fetchComplete = true;
            //     state.errMsg = '';
            //     //replace this with the filter for the currently logged in user
            //     state.data = action.payload.filter((user) => user.username = 'user')[0]
            //     console.log(action.payload.filter((user) => user.username = 'user')[0])
            // })
            // .addCase(fetchUserData.rejected, (state, action) => {
            //     state.isLoading = false;
            //     state.fetchComplete = true;
            //     state.errMsg = action.error ? action.error.message : 'Failed to get user data';
            //     state.data.preferences = userPref;
            //     console.log('Fetch data rejected')
            // })
            .addCase(attemptLogin.pending, (state) => {
                state.userState.userLoading = true;
                state.userState.success = false;
            })
            .addCase(attemptLogin.fulfilled, (state, action) => {
                state.userState.loggedIn = true;
                state.userState.userLoading = false;
                state.userState.success = true;
                state.data = action.payload
            })
            .addCase(attemptLogin.rejected, (state, action) => {
                state.userState.loggedIn = false;
                state.userState.userLoading = false;
                state.userState.success = false
                state.errMsg = 'User not found'
            })
            .addCase(postSettings.fulfilled, (state,action)=>{
                console.log('Save user preferences success')
            })
            .addCase(postSettings.rejected, (state,action)=>{
                console.log('Save user preferences failed!\n', action.error? action.error.message : 'Fetch failed')
            })
    }
})

export const userReducer = userSlice.reducer;
export const {logOutUser } = userSlice.actions;

export const getUserInfo = (state) => {
    return state.user
}

export const getUserPreferences = (state) => {
    return state.user.data.preferences
}