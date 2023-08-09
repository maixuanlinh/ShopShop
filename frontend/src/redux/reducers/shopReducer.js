import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
};

export const shopReducer = createReducer(initialState, {
  LoadShopRequest: (state) => {
    state.shopLoading = true;
  },
  LoadShopSuccess: (state, action) => {
    state.isShopAuthenticated = true;
    state.shopLoading = true;
    state.shop = action.payload;
  },
  LoadShopFail: (state, action) => {
    state.isShopAuthenticated = false;
    state.shopLoading = false;
    state.error = action.playload;
  },
  clearErrors: (state) => {
    state.error = null;
  },
});
