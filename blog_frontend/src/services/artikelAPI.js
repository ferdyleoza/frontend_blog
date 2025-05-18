import axios from "axios";

const API_URL = "http://localhost:6969/api/artikels"; // Ganti sesuai URL backend kamu

export const getAllArtikel = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Gagal mengambil data artikel:", error);
    return [];
  }
};

export const updateArtikel = async (id, updatedData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, updatedData);
    return response.data.data;
  } catch (error) {
    console.error('Gagal memperbarui artikel:', error);
    throw error;
  }
};

export const deleteArtikel = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error('Gagal menghapus artikel:', error);
    throw error;
  }
};