import React, { useEffect, useState } from 'react';
import {
  getAllPenulis,
  createPenulis,
  updatePenulis,
  deletePenulis,
} from '../services/penulisAPI';

const Penulis = () => {
  const [penulisList, setPenulisList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ nama: '', email: '' });
  const [editId, setEditId] = useState(null);

  const fetchPenulis = async () => {
    setLoading(true);
    try {
      const data = await getAllPenulis();
      setPenulisList(data);
    } catch (error) {
      console.error('Error saat fetch penulis:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPenulis();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await updatePenulis(editId, formData);
      } else {
        await createPenulis(formData);
      }
      setFormData({ nama: '', email: '' });
      setEditId(null);
      fetchPenulis();
    } catch (error) {
      console.error('Gagal menyimpan data penulis:', error);
    }
  };

  const handleEdit = (penulis) => {
    setFormData({ nama: penulis.nama, email: penulis.email });
    setEditId(penulis._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Yakin ingin menghapus penulis ini?')) {
      try {
        await deletePenulis(id);
        fetchPenulis();
      } catch (error) {
        console.error('Gagal menghapus penulis:', error);
      }
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Daftar Penulis</h1>

      <form onSubmit={handleSubmit} className="mb-6 space-y-4">
        <div>
          <label className="block mb-1 font-medium">Nama</label>
          <input
            type="text"
            name="nama"
            value={formData.nama}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {editId ? 'Update Penulis' : 'Tambah Penulis'}
        </button>
      </form>

      {loading ? (
        <p>Memuat data...</p>
      ) : penulisList.length === 0 ? (
        <p>Tidak ada data penulis.</p>
      ) : (
        <ul className="space-y-4">
          {penulisList.map((penulis) => (
            <li
              key={penulis._id}
              className="p-4 border rounded shadow-md bg-white"
            >
              <p className="font-semibold">Nama: {penulis.nama}</p>
              <p>Email: {penulis.email}</p>
              <div className="mt-2 space-x-2">
                <button
                  onClick={() => handleEdit(penulis)}
                  className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(penulis._id)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
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

export default Penulis;
