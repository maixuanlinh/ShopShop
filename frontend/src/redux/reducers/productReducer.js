import { createReducer } from "@reduxjs/toolkit";
const initialState = { productLoading: true,
}

export const productReducer = createReducer(initialState, {
    productCreateRequest: (state) => {
        state.productLoading = true;
    },

    productCreateSuccess: (state, action) => {
        state.productLoading = false;
        state.product = action.payload;
        state.success = true;
    },
    productCreateFail: (state, action) => {
        state.productLoading = false;
        state.error = action.payload;
        state.success = false;
    },

    // get all products of shop 
    getAllProductsShopRequest: (state) => {
        state.productLoading = true;
    },
    getAllProductsShopSuccess: (state, action) => {
        state.productLoading = false;
        state.products = action.payload;
    },
    getAllProductsShopFailed: (state, action) => {
        state.productLoading = false;
        state.error = action.payload;
    },
    clearError: (state) => {
        state.error = null;
    }

});