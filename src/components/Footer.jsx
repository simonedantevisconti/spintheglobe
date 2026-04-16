import React from "react";
import "../styles/footer.css";

const Footer = () => {
  return (
    <footer className="app-footer">
      <div className="footer-content">
        <img
          src="/syndycore-img.jpeg"
          alt="Syndycore"
          className="footer-logo"
        />

        <p className="footer-text">
          © All rights reserved — Developed by <strong>Syndycore Team</strong>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
