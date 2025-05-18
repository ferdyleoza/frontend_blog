// src/pages/Komentar.jsx
import React, { useEffect, useState } from 'react';
import {
  getAllKomentar,
  createKomentar,
  updateKomentar,
  deleteKomentar,
} from '../services/komentarAPI';

const Komentar = () => {
  const [komentarList, setKomentarList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newKomentar, setNewKomentar] = useState('');

  useEffect(() => {
    fetchKomentar();
  }, []);

  const fetchKomentar = async () => {
    try {
      const data = await getAllKomentar();
      setKomentarList(data);
    } catch (error) {
      console.error('Gagal fetch komentar:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newKomentar.trim()) return;

    try {
      await createKomentar({ isi: newKomentar });
      setNewKomentar('');
      fetchKomentar();
    } catch (error) {
      console.error('Gagal menambahkan komentar:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteKomentar(id);
      fetchKomentar();
    } catch (error) {
      console.error('Gagal menghapus komentar:', error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Daftar Komentar</h1>

      <form onSubmit={handleSubmit} className="mb-6">
        <input
          type="text"
          placeholder="Tulis komentar..."
          className="border p-2 mr-2 rounded"
          value={newKomentar}
          onChange={(e) => setNewKomentar(e.target.value)}
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Kirim
        </button>
      </form>

      {loading ? (
        <p>Memuat komentar...</p>
      ) : komentarList.length === 0 ? (
        <p>Tidak ada komentar.</p>
      ) : (
        <ul className="space-y-4">
          {komentarList.map((komentar) => (
            <li key={komentar._id} className="p-4 border rounded shadow bg-white">
              <p>{komentar.isi}</p>
              <button
                onClick={() => handleDelete(komentar._id)}
                className="text-red-500 text-sm mt-2"
              >
                Hapus
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Komentar;
