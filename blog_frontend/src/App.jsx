// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Penulis from './pages/penulis';
import Artikel from './pages/artikel';
import Kategori from './pages/kategori';
import Komentar from './pages/komentar';
import Navbar from './components/Navbar'; // Pastikan path ini benar

function App() {
  return (
    <Router>
      {/* Render Navbar di luar Routes agar selalu terlihat */}
      <Navbar />

      {/* Area body untuk konten lain, termasuk ucapan selamat datang */}
      <div className="container mx-auto p-4">
        

        {/* Routes untuk menampilkan komponen berdasarkan URL */}
        <Routes>
          <Route path="/penulis" element={<Penulis />} />
          <Route path="/artikel" element={<Artikel />} />
          <Route path="/kategori" element={<Kategori />} />
          <Route path="/komentar" element={<Komentar />} />
          {/* Tambahkan route lainnya sesuai kebutuhan, misalnya route default */}
          {/* <Route path="/" element={<HomePage />} /> */}
        </Routes>
        <div className="bg-green-100 p-6 rounded-md shadow-md mt-4">
          <h2 className="text-xl font-semibold text-green-800 mb-2">Selamat Datang di Blog Kami!</h2>
          <p className="text-green-700">Kami senang Anda berkunjung. Jelajahi berbagai artikel menarik, berikan komentar, dan temukan berbagai kategori yang kami sediakan!</p>
        </div>
      </div>
    </Router>
  );
}

export default App;