import React from 'react';
import logo from "../../assets/images/zcoderlogo.png";
import "./Header.css";
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
const Header = () => {
  const navigate = useNavigate();

  const click=()=>{
    navigate('/');
  };

  return (
    <header className="top-header">
      <div className="left">
        <img
          src={logo}
          alt="ZCoder Logo"
          width="100"
          height="96"
          className="px-4"
        />
         <span className="brand-name">CODER</span>
      </div>
         <div className="center-nav">
       <NavLink to="/home/bookmark" className="nav-link">BookMarks</NavLink>
      <NavLink to="/rooms" className="nav-link">Rooms</NavLink>
      <NavLink to="/home/compiler" className="nav-link">Compiler</NavLink>
      <NavLink to="/home/profile" className="nav-link">Profile</NavLink>
      </div>

        <div className="right">
   <div> <p className="lo" onClick={click}>Log Out</p></div>
    
    </div>
    </header>
  );
};

export default Header;
