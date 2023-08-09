import {configureStore} from "@reduxjs/toolkit"
import {userReducer} from "./reducers/userReducer";
import { shopReducer} from "./reducers/shopReducer";

const Store = configureStore({ 
    reducer: {
        user: userReducer,
        shop: shopReducer
    }
});

export default Store;