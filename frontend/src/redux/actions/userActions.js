import axios from "axios"
import {server} from "../../server";

//load user 
export const loadUser = () => async(dispatch) => {
    try {
        dispatch({
            type: "LoadUserRequest",
        });
        const {data} = await axios.get(`${server}/user/getuser`, {withCredentials: true});

          console.log("load user success called");

        dispatch({
            type: "LoadUserSuccess",
            payload: data.user,
        })

    } catch (error) {
        dispatch({
            type: "LoadUserFail",
            payload: error.response.data.message
        })
    }

}

//load shop
export const loadShop = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoadShopRequest",
    });
    const { data } = await axios.get(`${server}/shop/getShop`, {
      withCredentials: true,
    });

    dispatch({
      type: "LoadShopSuccess",
      payload: data.shop,
    });
  } catch (error) {
    dispatch({
      type: "LoadShopFail",
      payload: error.response.data.message,
    });
  }
};