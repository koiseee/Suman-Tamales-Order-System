import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <div className={`navbar ${isScrolled ? "scrolled" : ""}`}>
        <img src="" alt="Logo" className="icon-logo" />
        <Link to="/home" onClick={handleClick}>
          Home
        </Link>
        <Link to="/menu" onClick={handleClick}>
          Menu
        </Link>
        <Link to="/order" onClick={handleClick}>
          Orders
        </Link>
        <div
          className={`menu-icon ${isSidebarOpen ? "open" : ""}`}
          onClick={toggleSidebar}
        >
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <Link to="#about">About</Link>
        <Link to="/login">Logout</Link>
      </div>
    </>
  );
}
