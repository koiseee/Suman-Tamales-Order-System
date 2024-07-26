import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Home from "./components/Home/Home";
import Order from "./components/Orders/Order";
import MenuHome from "./components/Menu/Menu-page";

export default function RouteSwitcher() {
  const location = useLocation();

  return (
    <TransitionGroup>
      <CSSTransition key={location.key} classNames="fade" timeout={300}>
        <div>
          <Routes location={location}>
            <Route path="/home" element={<Home />} />
            <Route path="/menu" element={<MenuHome />} />
            <Route path="/order" element={<Order />} />
          </Routes>
        </div>
      </CSSTransition>
    </TransitionGroup>
  );
}
