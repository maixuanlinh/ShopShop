import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "../components/Layout/Loader";


const ShopProtectedRoute = ({ children }) => {
  

    const { shopLoading, isShopAuthenticated } = useSelector((state) => state.shop);
    if (shopLoading) {
      console.log("Loading");
      return <Loader />;
    } else {
      console.log("loaded");
      if (!isShopAuthenticated) {
        console.log("to login");
        return <Navigate to={`/shop-login`} replace />;
      }
      return children;
    }
};

export default ShopProtectedRoute;
