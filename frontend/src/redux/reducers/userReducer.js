import {createReducer} from "@reduxjs/toolkit"

const initialState = {
    isAuthenticated: false,
}

export const userReducer = createReducer(initialState, {
    LoadUserRequest: (state) => {
        state.loading = true;
    },
    LoadUserSuccess: (state, action) => {
        state.isAuthenticated = true;
        state.loading = true;
        state.user = action.payload;
    },
    LoadUserFail: (state, action) => {
        state.isAuthenticated = false;
        state.loading = false;
        state.error = action.playload;
    },
    clearErrors: (state) => {
        state.error = null;
    },

})