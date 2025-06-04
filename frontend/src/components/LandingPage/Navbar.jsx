import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from "../../assets/images/zcoderlogo.png";
import './Navbar.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const get = () => {
    navigate('/signup');  
  };

  const log = () => {
    navigate('/signin'); 
  };

  return (
    <header className="navbar">
      <div className="left-section">
        <div className="logo-container">
          <img src={logo} alt="ZCoder Logo" className="logo-img" />
        </div>
        <h1 className="code">CODER</h1>
      </div>

      <nav className={`right-section ${menuOpen ? 'show' : ''}`}>
        <button className="bt1" onClick={get}>Get Started</button>
        <button className="bt2" onClick={log}>Log In</button>
      </nav>
    </header>
  );
};

export default Navbar;
