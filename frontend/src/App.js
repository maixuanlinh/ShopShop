import React, { useEffect } from 'react';
import {BrowserRouter, Routes, Route, useNavigate, Navigate } from "react-router-dom";
import {LoginPage, SignupPage, ActivationPage, HomePage, ProductPage, BestSellingPage, EventsPage, FAQPage, 
ProductDetailsPage, PaymentPage, OrderSuccessPage, CheckoutPage, ProfilePage, ShopCreatePage, SellerActivationPage,
ShopLoginPage, 
} from "./routes/Routes.js";
import './App.css';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {toast} from "react-toastify";
import Store from "./redux/store";
import {loadShop, loadUser} from "./redux/actions/userActions.js"
import ProtectedRoute from './routes/ProtectedRoute.js';
import { useSelector } from "react-redux";
import {
  ShopHomePage,
  ShopDashboardPage,
  ShopCreateProduct,
  ShopAllProducts,
  ShopEvents,
  ShopCreateEvent,
  ShopAllCoupons
} from "./routes/ShopRoutes.js";


import ShopProtectedRoute from './routes/ShopProtectedRoute.js';


const App = () => {


  useEffect(() => {
    Store.dispatch(loadUser());
    Store.dispatch(loadShop());
  
     
  }, [])


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignupPage />} />
        <Route
          path="/activation/:activation_token"
          element={<ActivationPage />}
        />

        <Route
          path="/shop/activation/:activation_token"
          element={<SellerActivationPage />}
        />
        <Route path="/shop-login" element={<ShopLoginPage />} />

        <Route
          path="/shop/:id"
          element={
            <ShopProtectedRoute>
              <ShopHomePage />
            </ShopProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ShopProtectedRoute>
              <ShopDashboardPage />
            </ShopProtectedRoute>
          }
        />

        <Route
          path="/dashboard-create-product"
          element={
            <ShopProtectedRoute>
              <ShopCreateProduct />
            </ShopProtectedRoute>
          }
        />

        <Route
          path="/dashboard-create-event"
          element={
            <ShopProtectedRoute>
              <ShopCreateEvent />
            </ShopProtectedRoute>
          }
        />

        <Route
          path="/dashboard-events"
          element={
            <ShopProtectedRoute>
              <ShopEvents />
            </ShopProtectedRoute>
          }
        />

        <Route
          path="/dashboard-coupons"
          element={
            <ShopProtectedRoute>
              <ShopAllCoupons />
            </ShopProtectedRoute>
          }
        />

        <Route
          path="/dashboard-products"
          element={
            <ShopProtectedRoute>
              <ShopAllProducts />
            </ShopProtectedRoute>
          }
        />

        <Route path="/shop-create" element={<ShopCreatePage />} />

        <Route path="/products" element={<ProductPage />} />
        <Route path="/product/:name" element={<ProductDetailsPage />} />
        <Route path="best-selling" element={<BestSellingPage />} />

        <Route path="/events" element={<EventsPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />

        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/order/success/:d" element={<OrderSuccessPage />} />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <CheckoutPage />
            </ProtectedRoute>
          }
        />
      </Routes>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </BrowserRouter>
  );
}

export default App
