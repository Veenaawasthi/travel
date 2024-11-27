import React from "react";
import "./Footer.css"; // Make sure this file exists

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} Rising Destination. All rights reserved.</p>
        <div className="social-media">
          <a href="www.google.com" aria-label="Facebook">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="www.google.com" aria-label="Twitter">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="www.google.com" aria-label="Instagram">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="www.google.com" aria-label="LinkedIn">
            <i className="fab fa-linkedin-in"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
