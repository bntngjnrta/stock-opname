import React, { useState } from "react";
import ItemTable from "../components/ItemTable";
import ItemForm from "../components/ItemForm";
import Modal from "../components/Modal";
import SearchBar from "../components/SearchBar";

export default function ConsumablesPage({ items, setItems, addHistory }) {
  const [q, setQ] = useState("");
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const filtered = items.filter(i => i.type === "consumable" && (i.name.toLowerCase().includes(q.toLowerCase()) || i.id.toLowerCase().includes(q.toLowerCase())));

  function handleAdd(item) {
    if (items.find(it => it.id === item.id)) {
      alert("ID sudah ada");
      return;
    }
    setItems(prev => {
      const next = [...prev, item];
      addHistory({ action: "add", item });
      return next;
    });
    setShowForm(false);
  }

  function handleEditSubmit(item) {
    setItems(prev => {
      const next = prev.map(it => it.id === item.id ? item : it);
      addHistory({ action: "edit", item });
      return next;
    });
    setEditing(null);
    setShowForm(false);
  }

  function handleDelete(id) {
    const item = items.find(i => i.id === id);
    if (!confirm(`Hapus item ${id}?`)) return;
    setItems(prev => {
      const next = prev.filter(i => i.id !== id);
      addHistory({ action: "delete", item });
      return next;
    });
  }

  return (
    <div className="container page">
      <div className="page-head">
        <h2>Consumables</h2>
        <div className="actions">
          <SearchBar value={q} onChange={setQ} />
          <button className="btn" onClick={() => { setShowForm(true); setEditing(null); }}>Tambah Consumable</button>
        </div>
      </div>

      <ItemTable items={filtered} onEdit={(it) => { setEditing(it); setShowForm(true); }} onDelete={handleDelete} />

      {showForm && (
        <Modal onClose={() => setShowForm(false)}>
          <ItemForm
  initial={editing}
  onCancel={() => setShowForm(false)}
  onSubmit={editing ? handleEditSubmit : handleAdd}
  items={items}
  defaultType="consumable"
/>
        </Modal>
      )}
    </div>
  );
}
