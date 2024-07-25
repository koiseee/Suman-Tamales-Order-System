import React, { useState } from "react";
import "./Home.css";
import About from "../About/About";
import Contact from "../Contact/Contact";
import Footer from "../Footer";

export default function Home() {
  return (
    <div>
      <div className="home-sec">
        <span className="wave"></span>
        <div className="tag-line">
          <h2>
            Savor the taste of tradition <br />
            with every bite of our handcrafted <br />{" "}
            <span>Suman and Tamales</span>, <br />
            where heritage meets flavor <br /> in a delicious embrace.
          </h2>
        </div>
        <div className="learn-more">
          <a href="about">
            <p>Learn More</p>
          </a>
        </div>
        <img src="../../bilo-bilo.png" alt="" />
        
      </div>
      <About />
      <Contact />
      <Footer />
    </div>
  );
}
