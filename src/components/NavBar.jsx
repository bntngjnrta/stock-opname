import React from "react";
import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Dashboard" },
  { to: "/assets", label: "Assets" },
  { to: "/non-assets", label: "Non-Assets" },
  { to: "/consumables", label: "Consumables" },
  { to: "/history", label: "History" }
];

export default function NavBar() {
  return (
    <nav className="nav">
      <div className="container nav-inner">
        {links.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            className={({ isActive }) => "nav-link " + (isActive ? "active" : "")}
            end
          >
            {l.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
