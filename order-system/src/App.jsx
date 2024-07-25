import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header/Header";
import RouteSwitcher from "./RouteSwitcher";
import { CartProvider } from "./components/CartContext";

export default function App() {
  return (
    <Router>
      <CartProvider>
        <Header />
        <RouteSwitcher />
      </CartProvider>
    </Router>
  );
}
