import React from "react";

export default function SearchBar({ value, onChange, placeholder = "Cari item..." }) {
  return (
    <input
      className="input search"
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  );
}
