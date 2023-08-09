import { Navigate } from "react-router-dom";


const ShopProtectedRoute = ({ isShopAuthenticated, shop, children }) => {
  if (!isShopAuthenticated) {
    return <Navigate to={`/`} replace />;
  }
  return children;
};

export default ShopProtectedRoute;
