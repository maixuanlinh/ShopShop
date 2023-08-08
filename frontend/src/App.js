import React, { useEffect } from 'react';
import {BrowserRouter, Routes, Route } from "react-router-dom";
import {LoginPage, SignupPage, ActivationPage, HomePage, ProductPage, BestSellingPage, EventsPage, FAQPage, 
ProductDetailsPage, PaymentPage, OrderSuccessPage, CheckoutPage, ProfilePage
} from "./Routes.js";
import './App.css';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {toast} from "react-toastify";
import Store from "./redux/store";
import {loadUser} from "./redux/actions/userActions.js"
import ProtectedRoute from './ProtectedRoute.js';
import { useSelector } from "react-redux";



const App = () => {
  const {loading, isAuthenticated} = useSelector((state) => state.user);

  useEffect(() => {
    Store.dispatch(loadUser());
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
        <Route path="/products" element={<ProductPage />} />
        <Route path="/product/:name" element={<ProductDetailsPage />} />
        <Route path="best-selling" element={<BestSellingPage />} />

        <Route path="/events" element={<EventsPage />} />
        <Route path="/faq" element={<FAQPage />} />

        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/order/success/:d" element={<OrderSuccessPage />} />
        <Route path="/profile" element={<ProtectedRoute isAuthenticated={isAuthenticated}>
        <ProfilePage/>
        </ProtectedRoute>} />
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
