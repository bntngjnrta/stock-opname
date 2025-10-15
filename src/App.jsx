import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import NavBar from "./components/NavBar";

import Dashboard from "./pages/Dashboard";
import AssetsPage from "./pages/AssetsPage";
import NonAssetsPage from "./pages/NonAssetsPage";
import ConsumablesPage from "./pages/ConsumablesPage";
import HistoryPage from "./pages/HistoryPage";
import NotFound from "./pages/NotFound";

import useLocalStorage from "./hooks/useLocalStorage";
import { sampleItems } from "./data/sampleData";

export default function App() {
  const [items, setItems] = useLocalStorage("so_items", sampleItems);
  const [history, setHistory] = useLocalStorage("so_history", []);

  function addHistory(entry) {
    const h = { ts: Date.now(), ...entry };
    setHistory(prev => [...prev, h]);
  }

  return (
    <div>
      <Header />
      <NavBar />

      <main>
        <Routes>
          <Route path="/" element={<Dashboard items={items} />} />
          <Route path="/assets" element={<AssetsPage items={items} setItems={setItems} addHistory={addHistory} />} />
          <Route path="/non-assets" element={<NonAssetsPage items={items} setItems={setItems} addHistory={addHistory} />} />
          <Route path="/consumables" element={<ConsumablesPage items={items} setItems={setItems} addHistory={addHistory} />} />
          <Route path="/history" element={<HistoryPage history={history} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <footer className="footer">
        <div className="container">
          Bintang Januarta - Zaldi Aprialdi - Azzahra Tiara - Raka Ghaisan
        </div>
      </footer>
    </div>
  );
}
