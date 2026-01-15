
// src/components/Header.jsx
import React from "react";
import { Link } from "react-router-dom";
import "../styles.css"; // Reuse global styles

export default function Header() {
  return (
    <header className="mc-header" role="banner">
      <div className="mc-header__wrap">
        <Link to="/" className="mc-header__brand" aria-label="Go to home">
          <span className="mc-header__logo" aria-hidden="true">🩺</span>
          <span className="mc-header__title">Medi-Connect</span>
        </Link>

        <nav className="mc-header__nav" aria-label="Primary">
          <Link to="/register" className="mc-header__link">Register</Link>
          <Link to="/login" className="mc-header__link">Login</Link>
        
        </nav>
      </div>
    </header>
  );
}

