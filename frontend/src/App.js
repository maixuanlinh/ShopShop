import React from 'react';
import {BrowserRouter, Routes, Route } from "react-router-dom";
import {LoginPage, SignupPage, ActivationPage} from "./Routes.js";
import './App.css'


const App = () => {
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
    </BrowserRouter>
  );
}

export default App
