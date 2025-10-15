import React from "react";

export default function Dashboard({ items }) {
  const total = items.length;

  const byType = items.reduce((acc, it) => { 
    acc[it.type] = (acc[it.type] || 0) + 1; 
    return acc; 
  }, {});

  return (
    <div className="container page">
      <h2>Dashboard</h2>
      <div className="grid stats">
        <div className="stat card">
          <h3>Total Items</h3>
          <p className="big">{total}</p>
        </div>
        <div className="stat card">
          <h3>Assets</h3>
          <p className="big">{byType["asset"] || 0}</p>
        </div>
        <div className="stat card">
          <h3>Non-Assets</h3>
          <p className="big">{byType["non-asset"] || 0}</p>
        </div>
        <div className="stat card">
          <h3>Consumables</h3>
          <p className="big">{byType["consumable"] || 0}</p>
        </div>
      </div>
    </div>
  );
}
