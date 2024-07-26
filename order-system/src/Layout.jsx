import React from "react";
import { useLocation } from "react-router-dom";
import Header from "./components/Header/Header";
import RouteSwitcher from "./RouteSwitcher";

export default function Layout() {
  const location = useLocation();
  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";

  return (
    <div>
      {!isAuthPage && <Header />}
      <RouteSwitcher />
    </div>
  );
}
