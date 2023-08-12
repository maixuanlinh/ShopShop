import {configureStore} from "@reduxjs/toolkit"
import {userReducer} from "./reducers/userReducer";
import { shopReducer} from "./reducers/shopReducer";
import { productReducer } from "./reducers/productReducer";

const Store = configureStore({ 
    reducer: {
        user: userReducer,
        shop: shopReducer,
        product: productReducer
    }
});

export default Store;