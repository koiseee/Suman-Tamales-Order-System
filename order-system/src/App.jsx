import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CartProvider } from "./components/CartContext";
import Login from "./components/Account/Login";
import Layout from "./Layout";
import Register from "./components/Account/Register";

export default function App() {
  return (
    <Router>
      <CartProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/*" element={<Layout />} />
        </Routes>
      </CartProvider>
    </Router>
  );
}
