// App.js
import React from 'react';
import Navbar from "./Components/Navbar/Navbar";
import Registration from "./Forms/Registration";
import Home from "./Pages/Home";
import Dashboard from "./Pages/Dashboard.js";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from './Components/PrivateRoute';
import { Private } from './Pages/Private';
import PagenotFound from './Pages/PagenotFound.js';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="/login" element={<Registration />} />
        <Route path="/private" element={<PrivateRoute />}>
          <Route path="" element={<Private />} />
          <Route path="/private/dashboard" element={<Dashboard />} />
        </Route>
        <Route path="*" element={<PagenotFound />} />
      </Routes>
    </div>
  );
}

export default App;
