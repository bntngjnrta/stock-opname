import React from "react";

export default function ItemCard({ item, onEdit, onDelete }) {
  return (
    <div className="card">
      <div className="card-header">
        <strong>{item.name}</strong> <span className="muted">({item.id})</span>
      </div>
      <div className="card-body">
        <div>Type: <span className="badge">{item.type}</span></div>
        <div>Qty: {item.qty}</div>
        <div>Location: {item.location}</div>
      </div>
      <div className="card-actions">
        <button className="btn" onClick={() => onEdit(item)}>Edit</button>
        <button className="btn ghost" onClick={() => onDelete(item.id)}>Delete</button>
      </div>
    </div>
  );
}
