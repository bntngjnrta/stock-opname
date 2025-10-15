import React from "react";

export default function ItemTable({ items, onEdit, onDelete }) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>ID</th><th>Nama</th><th>Type</th><th>Qty</th><th>Location</th><th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {items.length === 0 && (
          <tr><td colSpan="6" className="muted">Tidak ada item</td></tr>
        )}
        {items.map(it => (
          <tr key={it.id}>
            <td>{it.id}</td>
            <td>{it.name}</td>
            <td><span className="badge small">{it.type}</span></td>
            <td>{it.qty}</td>
            <td>{it.location}</td>
            <td>
              <button className="btn small" onClick={() => onEdit(it)}>Edit</button>
              <button className="btn small ghost" onClick={() => onDelete(it.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
