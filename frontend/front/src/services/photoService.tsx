import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export async function getAllPhotos() {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Token não encontrado");

  const res = await axios.get(`${API_URL}/photos`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

export async function getPhotos(categoryId: string) {
  const token = localStorage.getItem("token");
  const res = await axios.get(`${API_URL}/categories/${categoryId}/photos`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

export async function createPhoto(categoryId: string, formData: FormData) {
  const token = localStorage.getItem("token");
  const res = await axios.post(`${API_URL}/categories/${categoryId}/photos`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
}


export async function updatePhotoDescription(categoryId: string, photoId: string, description: string) {
  const token = localStorage.getItem("token");
  const res = await axios.patch(
    `${API_URL}/categories/${categoryId}/photos/${photoId}/description`,
    { description },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.data;
}

export async function deletePhoto(categoryId: string, photoId: string) {
  const token = localStorage.getItem("token");
  const res = await axios.delete(`${API_URL}/categories/${categoryId}/photos/${photoId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}


export async function deletePhotoGlobal(photoId: string) {
  const token = localStorage.getItem("token");
  const res = await axios.delete(`${API_URL}/photos/${photoId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}