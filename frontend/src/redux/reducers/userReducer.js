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
        state.loading = false;
        state.user = action.payload;
             console.log("Loaded user:", action.payload);
          console.log("redux isAuthenticated:", state.isAuthenticated);
    },
    LoadUserFail: (state, action) => {
        state.isAuthenticated = false;
        state.loading = false;
        state.error = action.payload;
    },
    clearErrors: (state) => {
        state.error = null;
    },

})

