import React from "react";
import "./About.css";

export default function About() {
  return (
    <div className="about-sec">
        <div className="best">
           <h3>Customer's Choice</h3>
           <h1>Discover Our Best Sellers!</h1>
        </div>

      <div className="container">
        <input type="radio" name="slider" id="s1" />
        <input type="radio" name="slider" id="s2" />
        <input type="radio" name="slider" id="s3" />

        <div className="cards">
          <label htmlFor="s1" id="slide1">
            <div className="card">
              <div className="image">
                <img src="../../suman-malagkit.png" alt="" />
                <div className="infos">
                    <span>Suman</span>
                    <div className="order">
                        <a href="">Order Now!</a>
                    </div>
                </div>
              </div>
            </div>
          </label>

          <label htmlFor="s2" id="slide2">
            <div className="card">
              <div className="image">
                <img src="../../tamales.png" alt="" />
                <div className="infos">
                    <span>Tamales</span>
                    <div className="order">
                        <a href="">Order Now!</a>
                    </div>
                </div>
              </div>
            </div>
          </label>

          <label htmlFor="s3" id="slide3">
            <div className="card">
              <div className="image">
                <img src="../../pinindot.png" alt="" />
                <div className="infos">
                    <span>Pinindot</span>
                    <div className="order">
                        <a href="">Order Now!</a>
                    </div>
                </div>
              </div>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
}