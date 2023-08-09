import React, { useEffect } from 'react'
import ShopLogin from "../components/Shop/ShopLogin.jsx"
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const ShopLoginPage = () => {

     const { isShopAuthenticated, shop } = useSelector((state) => state.shop);
     const navigate = useNavigate();

     useEffect(() => {
        
       if (isShopAuthenticated === true) {
         navigate(`/shop/${shop._id}`);
       }
     }, [isShopAuthenticated]);
     
  return (
    <div>
            <ShopLogin />
    </div>
  )
}

export default ShopLoginPage