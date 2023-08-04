import React, { useEffect } from 'react';
import {BrowserRouter, Routes, Route } from "react-router-dom";
import {LoginPage, SignupPage, ActivationPage} from "./Routes.js";
import './App.css';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import {server} from "./server.js";
import {toast} from "react-toastify";

const App = () => {

  useEffect(() => {
    axios.get(`${server}/user/getuser`, {withCredentials: true}).then((res)=> {
      toast.success(res.data.message);
    }).catch((error) => {
      toast.error(error.response.data.message);
    });
  }, [])
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignupPage />} />
        <Route
          path="/activation/:activation_token"
          element={<ActivationPage />}
        />
      </Routes>
      <ToastContainer
      position='bottom-center'
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme='dark'
      />

    
    </BrowserRouter>
  );
}

export default App
