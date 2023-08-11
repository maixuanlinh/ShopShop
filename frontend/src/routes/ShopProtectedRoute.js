import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";


const ShopProtectedRoute = ({ children }) => {
  const { loading, isShopAuthenticated } = useSelector((state) => state.shop);
  if (!isShopAuthenticated) {
    console.log(isShopAuthenticated)
        return <Navigate to={`/shop-login`} replace />;
  }
  return children;
};

export default ShopProtectedRoute;
