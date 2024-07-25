import React from "react";
import "./Contact.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faPhone, faHome } from "@fortawesome/free-solid-svg-icons";

export default function Contact() {
  return (
    <div className="contact-sec">
      <span className="background-filt"></span>
      <div className="contact-header">
        <h1>Contact Us</h1>
        <h3>For more questions & information</h3>
      </div>
      <div className="contact-cards">
        <div className="contact-card">
          <span>
            <FontAwesomeIcon icon={faFacebook} className="contact-icon" />
          </span>
          <a href="https://facebook.com" target="_blank">
            facebook.com
          </a>
        </div>
        <div className="contact-card">
          <span>
            <FontAwesomeIcon icon={faPhone} className="contact-icon" />
          </span>
          <a href="https://facebook.com" target="_blank">
            09192910203 <br /> 09192931234
          </a>
        </div>
        <div className="contact-card">
          <span>
            <FontAwesomeIcon icon={faEnvelope} className="contact-icon" />
          </span>
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=detorresmhel02@gmail.com&su=Hello%20there&body=I%20wanted%20to%20reach%20out%20to%20you%20because..."
            target="_blank"
          >
            kapinas2024@gmail.com
          </a>
        </div>
        <div className="contact-card">
          <span>
            <FontAwesomeIcon icon={faHome} className="contact-icon" />
          </span>
          <a
            href="https://www.google.com/maps/place/Ka+Pina's+Special+Tamales+and+Suman/@13.8697442,121.0946047,17z/data=!3m1!4b1!4m6!3m5!1s0x33bd13590a2a9473:0xa1a5d8111a976155!8m2!3d13.869739!4d121.0971796!16s%2Fg%2F11t71n51r5?entry=ttu"
            target="_blank"
          >
            369 President Jose P. Laurel Hwy <br />, San Jose, Batangas
          </a>
        </div>
      </div>
    </div>
  );
}
