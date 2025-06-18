import React from "react";
import { resourcesLinks, platformLinks, compilerLinks } from "../../constants/constant";
import "./footer.css"; 

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-section">
          <h3>Resources</h3>
          <ul>
            {resourcesLinks.map((link, index) => (
              <li key={index}>
                <a href={link.href}>{link.text}</a>
              </li>
            ))}
          </ul>
        </div>
        <div className="footer-section">
          <h3>Platform</h3>
          <ul>
            {platformLinks.map((link, index) => (
              <li key={index}>
                <a href={link.href}>
                  <div className="platform-item">
                    <img src={link.image} alt={link.text} />
                    <span>{link.text}</span>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="footer-section">
          <h3>Compilers</h3>
          <ul>
            {compilerLinks.map((link, index) => (
              <li key={index}>
                <a href={link.href}>{link.text}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>

       <div className="footer-bottom">
         <p>© {new Date().getFullYear()} Zcoder - All Rights Reserved</p>
        </div>
    </footer>
  );
};

export default Footer;
