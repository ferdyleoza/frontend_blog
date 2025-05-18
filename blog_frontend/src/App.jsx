// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Penulis from './pages/Penulis';
import Artikel from './pages/artikel';
import Kategori from './pages/kategori';
import Komentar from './pages/komentar'; 
import Navbar from './components/Navbar'; // jika ada

function App() {
  return (
    <Router>
      <Navbar /> {/* Hapus jika belum ada komponen ini */}
      <Routes>
        <Route path="/penulis" element={<Penulis />} />
        <Route path="/artikel" element={<Artikel />} /> 
        <Route path="/kategori" element={<Kategori />} /> 
        <Route path="/komentar" element={<Komentar />} /> 
        {/* Tambahkan route lainnya sesuai kebutuhan */}
      </Routes>
    </Router>
  );
}

export default App;
