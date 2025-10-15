import React from "react";

export default function HistoryPage({ history }) {
  return (
    <div className="container page">
      <h2>Riwayat Perubahan</h2>
      {history.length === 0 ? (
        <div className="card muted">Belum ada riwayat.</div>
      ) : (
        <div className="timeline">
          {history.slice().reverse().map((h, idx) => (
            <div className="timeline-item card" key={idx}>
              <div className="muted">{new Date(h.ts).toLocaleString()}</div>
              <div><strong>{h.action.toUpperCase()}</strong> — {h.item.name} ({h.item.id})</div>
              {h.note && <div className="muted small">{h.note}</div>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
