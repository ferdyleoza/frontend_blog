import React, { useEffect, useState } from 'react';
import {
  getAllArtikel,
  createArtikel,
  updateArtikel,
  deleteArtikel,
} from '../services/artikelAPI';

const Artikel = () => {
  const [artikelList, setArtikelList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    judul: '',
    isi: '',
    tanggal: '',
    id_penulis: '',
    id_kategori: '',
  });
  const [editId, setEditId] = useState(null);

  const fetchArtikel = async () => {
    setLoading(true);
    try {
      const data = await getAllArtikel();
      setArtikelList(data);
    } catch (error) {
      console.error('Error saat fetch artikel:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArtikel();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        tanggal: new Date(formData.tanggal), // pastikan tanggal berupa objek Date
      };

      if (editId) {
        await updateArtikel(editId, payload);
      } else {
        await createArtikel(payload);
      }

      setFormData({
        judul: '',
        isi: '',
        tanggal: '',
        id_penulis: '',
        id_kategori: '',
      });
      setEditId(null);
      fetchArtikel();
    } catch (error) {
      console.error('Gagal menyimpan data artikel:', error);
    }
  };

  const handleEdit = (artikel) => {
    setFormData({
      judul: artikel.judul,
      isi: artikel.isi,
      tanggal: artikel.tanggal.split('T')[0], // ubah jadi format tanggal saja
      id_penulis: artikel.id_penulis,
      id_kategori: artikel.id_kategori,
    });
    setEditId(artikel._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Yakin ingin menghapus artikel ini?')) {
      try {
        await deleteArtikel(id);
        fetchArtikel();
      } catch (error) {
        console.error('Gagal menghapus artikel:', error);
      }
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-md shadow-md overflow-hidden">
        <div className="p-6 border-b">
          <h1 className="text-2xl font-semibold text-gray-800">Daftar Artikel</h1>
        </div>
        <div className="p-6">
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 mb-6">
            <input
              type="text"
              name="judul"
              value={formData.judul}
              onChange={handleChange}
              placeholder="Judul artikel"
              className="input"
              required
            />
            <input
              type="text"
              name="isi"
              value={formData.isi}
              onChange={handleChange}
              placeholder="Isi artikel"
              className="input"
              required
            />
            <input
              type="date"
              name="tanggal"
              value={formData.tanggal}
              onChange={handleChange}
              className="input"
              required
            />
            <input
              type="text"
              name="id_penulis"
              value={formData.id_penulis}
              onChange={handleChange}
              placeholder="ID Penulis"
              className="input"
              required
            />
            <input
              type="text"
              name="id_kategori"
              value={formData.id_kategori}
              onChange={handleChange}
              placeholder="ID Kategori"
              className="input"
              required
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded col-span-2"
            >
              {editId ? 'Update' : 'Tambah'} Artikel
            </button>
          </form>

          {loading ? (
            <p className="text-gray-600 italic">Memuat data artikel...</p>
          ) : artikelList.length === 0 ? (
            <p className="text-gray-600">Tidak ada data artikel.</p>
          ) : (
            <ul>
              {artikelList.map((artikel) => (
                <li
                  key={artikel._id}
                  className="py-3 px-4 border-b flex items-center justify-between"
                >
                  <div>
                    <p className="text-gray-800 font-semibold">{artikel.judul}</p>
                    <p className="text-gray-600 text-sm">{artikel.isi}</p>
                    <p className="text-gray-500 text-xs">
                      {new Date(artikel.tanggal).toLocaleDateString()}
                    </p>
                    <p className="text-gray-500 text-xs">Penulis ID: {artikel.id_penulis}</p>
                    <p className="text-gray-500 text-xs">Kategori ID: {artikel.id_kategori}</p>
                  </div>
                  <div className="space-x-2">
                    <button
                      onClick={() => handleEdit(artikel)}
                      className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-3 rounded text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(artikel._id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-3 rounded text-sm"
                    >
                      Hapus
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Artikel;
