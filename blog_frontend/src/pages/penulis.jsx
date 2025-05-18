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
        <div className="bg-gray-100 min-h-screen p-6"> {/* Latar belakang dan padding halaman */}
            <div className="max-w-3xl mx-auto bg-white rounded-md shadow-md overflow-hidden"> {/* Container utama */}
                <div className="p-6 border-b"> {/* Header container */}
                    <h1 className="text-2xl font-semibold text-gray-800">Daftar Penulis</h1>
                </div>
                <div className="p-6"> {/* Form container */}
                    <form onSubmit={handleSubmit} className="mb-4 flex space-x-2">
                        <input
                            type="text"
                            name="nama"
                            value={formData.nama}
                            onChange={handleChange}
                            placeholder="Nama penulis"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email penulis"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            {editId ? 'Update' : 'Tambah'} Penulis
                        </button>
                    </form>

                    {loading ? (
                        <p className="text-gray-600 italic">Memuat data penulis...</p>
                    ) : penulisList.length === 0 ? (
                        <p className="text-gray-600">Tidak ada data penulis.</p>
                    ) : (
                        <ul>
                            {penulisList.map((penulis) => (
                                <li
                                    key={penulis._id}
                                    className="py-3 px-4 border-b flex items-center justify-between"
                                >
                                    <div>
                                        <p className="text-gray-800 font-semibold">{penulis.nama}</p>
                                        <p className="text-gray-600 text-sm">{penulis.email}</p>
                                    </div>
                                    <div className="space-x-2">
                                        <button
                                            onClick={() => handleEdit(penulis)}
                                            className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-3 rounded focus:outline-none focus:shadow-outline text-sm"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(penulis._id)}
                                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-3 rounded focus:outline-none focus:shadow-outline text-sm"
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

export default Penulis;