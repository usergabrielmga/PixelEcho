import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export async function CreateCategory(
  title: string,
  coverImage: File | null
) {
  const token = localStorage.getItem("token");
  const formData = new FormData();

  formData.append("title", title);
  if (coverImage) {
    formData.append("coverImage", coverImage); 
  }

  return axios.post(`${API_URL}/categories`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
}


export async function getCategory() {
  const token = localStorage.getItem("token");

  const res = await axios.get(`${API_URL}/getcategories`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
}

export async function getCategoryById(id: string) {
  const token = localStorage.getItem("token");

  const res = await axios.get(`${API_URL}/categories/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
}


export async function updateCategory(
  id: string,
  title: string,
  coverImage: File | null
) {
  const token = localStorage.getItem("token");
  const formData = new FormData();

  formData.append("title", title);
  if (coverImage) {
    formData.append("coverImage", coverImage);
  }

  return axios.put(`${API_URL}/categories/${id}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
}


export async function deleteCategory(id: string) {
  const token = localStorage.getItem("token");

  return axios.delete(`${API_URL}/categories/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}