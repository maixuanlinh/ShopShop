import React from 'react';
import {BrowserRouter, Routes, Route } from "react-router-dom";
import {LoginPage} from "./Routes.js";
import './App.css'


const App = () => {
  return (
      <BrowserRouter>
        <Routes>
          <Route path='/Login' element={<LoginPage /> }/>

        </Routes>
      </BrowserRouter>
  )
}

export default App
