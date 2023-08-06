import React, { useEffect } from 'react';
import {BrowserRouter, Routes, Route } from "react-router-dom";
import {LoginPage, SignupPage, ActivationPage, HomePage, ProductPage, BestSellingPage, EventsPage, FAQPage} from "./Routes.js";
import './App.css';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {toast} from "react-toastify";
import Store from "./redux/store";
import {loadUser} from "./redux/actions/userActions.js"



const App = () => {

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
        <Route path="best-selling" element={<BestSellingPage />} />

        <Route path="/events" element={<EventsPage />} />
        <Route path="/faq" element={<FAQPage />} />
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
