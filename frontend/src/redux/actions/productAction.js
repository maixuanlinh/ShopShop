//create product 
import axios from "axios";
import {server} from "../../server";

export const createProduct = (newForm) => async (dispatch) => {
   
    
    try {
        dispatch({
            type: "productCreateRequest",
        });
        const config = {headers: {"Content-Type":"multipart/form-data"}};
        const {data} = await axios.post(`${server}/product/create-product`,
        newForm, config);

        dispatch({
            type: "productCreateSuccess",
            payload: data.product
        })


    } catch (error) {
        dispatch({
            type:"productCreateFail",
            payload: error.response.data.message,
        })
    }
}

/* // get All Products
export const getAllProductsShop = () => async (dispatch) => {
try {
    dispatch({
        type: "getAllProductsShopRequest",
    });
   
} catch (error) {
    dispatch({
        type: "getAllProductsShopFailed",
        payload: error.response.data.message
    })
}
} */