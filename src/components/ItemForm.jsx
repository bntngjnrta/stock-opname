import React, { useState, useEffect } from "react";

export default function ItemForm({
  initial = null,
  onCancel,
  onSubmit,
  items = [],
  defaultType = "asset",
}) {
  const [type, setType] = useState(initial ? initial.type : defaultType);
  const [id, setId] = useState("");
  const [form, setForm] = useState({
    name: "",
    qty: "",
    location: "",
  });
  const [errors, setErrors] = useState({});

  function generateNextIdForType(t) {
    const prefix = t === "asset" ? "A" : t === "non-asset" ? "N" : t === "consumable" ? "C" : "X";
    const filtered = (items || []).filter((it) => it.type === t);
    let maxNum = 0;
    filtered.forEach((it) => {
      if (!it || !it.id) return;
      const digits = (it.id.match(/\d+/) || ["0"])[0];
      const num = parseInt(digits, 10);
      if (!isNaN(num) && num > maxNum) maxNum = num;
    });
    const next = (maxNum + 1).toString().padStart(3, "0");
    return `${prefix}${next}`;
  }

  useEffect(() => {
    if (initial) {
      setType(initial.type || defaultType);
      setId(initial.id || generateNextIdForType(initial.type || defaultType));
      setForm({
        name: initial.name || "",
        qty: String(initial.qty ?? ""),
        location: initial.location || "",
      });
    } else {
      const nextId = generateNextIdForType(defaultType || type);
      setType(defaultType || type);
      setId(nextId);
      setForm({ name: "", qty: "", location: "" });
    }
  }, [initial, items]);

  useEffect(() => {
    if (!initial) {
      const next = generateNextIdForType(type);
      setId(next);
    }
  }, [type, items]);

  function validate() {
    const e = {};
    if (!id) e.id = "ID tidak boleh kosong";
    if (!form.name) e.name = "Nama harus diisi";
    if (form.qty === "" || isNaN(Number(form.qty)) || Number(form.qty) < 0) e.qty = "Qty harus angka >= 0";
    if (!form.location) e.location = "Lokasi harus diisi";
    return e;
  }

  function handleSubmit(ev) {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length === 0) {
      const payload = {
        id,
        type,
        name: form.name,
        qty: Number(form.qty),
        location: form.location,
      };
      onSubmit(payload);
    }
  }

  return (
    <form className="card form-card" onSubmit={handleSubmit}>
      <h3>{initial ? "Edit Item" : "Tambah Item"}</h3>

      <label className="label">ID</label>
      <input className="input" value={id} readOnly />
      {errors.id && <div className="error">{errors.id}</div>}

      <label className="label">Nama</label>
      <input
        className="input"
        value={form.name}
        onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
      />
      {errors.name && <div className="error">{errors.name}</div>}

      <label className="label">Qty</label>
      <input
        className="input"
        value={form.qty}
        onChange={(e) => setForm((s) => ({ ...s, qty: e.target.value }))}
      />
      {errors.qty && <div className="error">{errors.qty}</div>}

      <label className="label">Lokasi</label>
      <input
        className="input"
        value={form.location}
        onChange={(e) => setForm((s) => ({ ...s, location: e.target.value }))}
      />
      {errors.location && <div className="error">{errors.location}</div>}

      <label className="label">Tipe</label>
      <select
        className="input"
        value={type}
        onChange={(e) => setType(e.target.value)}
        disabled={!!initial}
      >
        <option value="asset">Asset</option>
        <option value="non-asset">Non-Asset</option>
        <option value="consumable">Consumable</option>
      </select>

      <div className="form-actions">
        <button type="submit" className="btn">{initial ? "Simpan" : "Tambah"}</button>
        <button type="button" className="btn ghost" onClick={onCancel}>Batal</button>
      </div>
    </form>
  );
}
