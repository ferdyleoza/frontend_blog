import axios from 'axios';

const API_URL = 'http://localhost:6969/api/artikels';

export const getAllArtikel = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data.data;
  } catch (error) {
    console.error('Gagal mengambil data artikel:', error);
    throw error;
  }
};

export const createArtikel = async (artikel) => {
  try {
    const response = await axios.post(API_URL, artikel);
    return response.data.data;
  } catch (error) {
    console.error('Gagal menambahkan artikel:', error);
    throw error;
  }
};

export const updateArtikel = async (id, artikel) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, artikel);
    return response.data.data;
  } catch (error) {
    console.error('Gagal mengupdate artikel:', error);
    throw error;
  }
};

export const deleteArtikel = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data.data;
  } catch (error) {
    console.error('Gagal menghapus artikel:', error);
    throw error;
  }
};
