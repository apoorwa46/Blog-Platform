import React from "react";
import { FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import "../App.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-title">
        <p>
          Created By <strong>Apoorwa Kumar</strong>
        </p>
      </div>

      <div className="footer-icons">
        {[
          { icon: <SiLeetcode />, link: "https://leetcode.com/u/q44d0RGl5v/" },
          { icon: <FaTwitter />, link: "https://x.com/apoorwa466" },
          { icon: <FaLinkedin />, link: "https://www.linkedin.com/in/apoorwa-kumar-479461302/" },
          { icon: <FaInstagram />, link: "https://www.instagram.com/apoorwa466/" },
        ].map((item, index) => (
          <a
            key={index}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-icon"
          >
            {item.icon}
          </a>
        ))}
      </div>
    </footer>
  );
}

export default Footer;


