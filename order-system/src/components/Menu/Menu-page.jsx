import React from "react";
import Menu from "./Menu";
import MenuData from "./Menu-data";
import Footer from "../Footer";

export default function MenuHome() {
  const menuElements = MenuData.map((info) => {
    return <Menu key={info.id} {...info} />;
  });

  return (
    <div>
      <div className="menu-container">
        <span className="wave"></span>
        <div className="menu-box">
          <h1 className="menu-style">Menu</h1>
          <p className="menu-style">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio
            ad rerum rem.
          </p>
          <div className="menu-bg">{menuElements}</div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
