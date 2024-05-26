import React from 'react';
import './Navbar.css'; // Create this CSS file for styling

const Navbar = () => {
  return (
    <nav className="subnavbar">
      <div className="subnavbar-left">
        <a href="/">
          <img src="logo.png" alt="Travelperk" className="logo" />
        </a>
      </div>
      <div className="subnavbar-center">
        <a href="/">Home</a>
        <a href="/about">Discover</a>
        <a href="/services">Trips</a>
        <a href="/contact">More</a>
      </div>
      <div className="subnavbar-right">
        <button className="btn-card">Cart</button>
        <button className="btn-signin">Sign In</button>
      </div>
    </nav>
  );
};

export default Navbar;
