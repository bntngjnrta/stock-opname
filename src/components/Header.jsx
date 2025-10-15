import React from "react";
import logo from "../assets/logo.png";

export default function Header() {
  return (
    <header className="header">
      <div className="container header-inner">
        <div className="title-section">
          <img src={logo} alt="Logo" className="logo" />
          <div>
            <h1>Sistem Informasi Stock Opname</h1>
            <p className="subtitle">Monitoring Asset · Non-Asset · Consumable</p>
          </div>
        </div>
        <div className="brand-badge">v1.0</div>
      </div>
    </header>
  );
}
