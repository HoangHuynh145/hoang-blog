import { createSlice } from '@reduxjs/toolkit'
import { AuthState } from '../services/Interfaces'
import { UserLoginInfo } from '../services/Interfaces'

const initialState: AuthState = {
    currentUser: null,
    emailUser: null,
    login: {
        isFectching: false,
        success: false,
        error: false
    },
    register: {
        isFectching: false,
        success: false,
        error: false
    },
    logout: {
        isFectching: false,
        success: false,
        error: false
    }
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        updateToken: (state, action) => {
            const accessToken: string = action.payload
            state.currentUser = { ...state.currentUser as UserLoginInfo, accessToken }
        },

        updateCurrentUser: (state, action) => {
            const updateField = action.payload
            state.currentUser = { ...state.currentUser, ...updateField }
        },

        loginStart: (state) => {
            state.login.isFectching = true
        },

        loginSuccess: (state, action) => {
            state.login.isFectching = false
            state.login.success = true
            state.login.error = false
            state.currentUser = action.payload
            state.emailUser = null
        },

        loginFailure: (state) => {
            state.login.isFectching = false
            state.login.success = false
            state.login.error = true
        },

        registerStart: (state) => {
            state.register.isFectching = true
        },

        registerSuccess: (state, action) => {
            state.register.isFectching = false
            state.register.success = true
            state.register.error = false
            state.emailUser = action.payload
        },

        registerFailure: (state) => {
            state.register.isFectching = false
            state.register.success = false
            state.register.error = true
        },

        logoutStart: (state) => {
            state.logout.isFectching = true
        },

        logoutSuccess: (state) => {
            state.logout.isFectching = false
            state.logout.success = true
            state.logout.error = false
            state.currentUser = null
            state.emailUser = null
        },

        logoutFailure: (state) => {
            state.logout.isFectching = false
            state.logout.success = false
            state.logout.error = true
        },
    }
})

export const {
    loginStart,
    loginSuccess,
    loginFailure,
    registerStart,
    registerSuccess,
    registerFailure,
    logoutStart,
    logoutSuccess,
    logoutFailure,
    updateToken,
    updateCurrentUser
} = authSlice.actions

export default authSlice.reducer
