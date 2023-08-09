import React, { useEffect } from 'react'
import ShopCreate from "../components/Shop/ShopCreate.jsx"
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ShopCreatePage = () => {

       const { isShopAuthenticated, shop } = useSelector((state) => state.shop);
       const navigate = useNavigate();

       useEffect(() => {
         if (isShopAuthenticated === true) {
           navigate(`/shop/${shop._id}`);
         }
       }, [isShopAuthenticated]);

  return (
    <div>
        <ShopCreate />
    </div>
  )
}

export default ShopCreatePage