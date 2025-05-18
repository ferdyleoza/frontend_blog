import React, { useEffect, useState } from 'react';
import {
  getAllKategori,
  createKategori,
  updateKategori,
  deleteKategori,
} from '../services/kategoriAPI';

const Kategori = () => {
  const [kategoriList, setKategoriList] = useState([]);
  const [nama, setNama] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const data = await getAllKategori();
      setKategoriList(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nama) return;

    try {
      if (editingId) {
        await updateKategori(editingId, { nama });
        setEditingId(null);
      } else {
        await createKategori({ nama });
      }
      setNama('');
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (kategori) => {
    setNama(kategori.nama);
    setEditingId(kategori._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Yakin ingin menghapus kategori ini?')) {
      try {
        await deleteKategori(id);
        fetchData();
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Daftar Kategori</h1>

      <form onSubmit={handleSubmit} className="mb-6 space-y-2">
        <input
          type="text"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          placeholder="Nama kategori"
          className="p-2 border rounded w-full"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {editingId ? 'Update' : 'Tambah'} Kategori
        </button>
      </form>

      {loading ? (
        <p>Memuat data...</p>
      ) : kategoriList.length === 0 ? (
        <p>Tidak ada kategori tersedia.</p>
      ) : (
        <ul className="space-y-4">
          {kategoriList.map((kategori) => (
            <li
              key={kategori._id}
              className="p-4 border rounded shadow-md bg-white flex justify-between items-center"
            >
              <span>{kategori.nama}</span>
              <div className="space-x-2">
                <button
                  onClick={() => handleEdit(kategori)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(kategori._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Hapus
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Kategori;
