import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export async function LoginData(email: string, password: string) {
    const response = await axios.post(`${API_URL}/login`, { email, password })
    return response.data
}


export async function RegisterData(name: string, email: string, password: string) {
    const response = await axios.post(`${API_URL}/register`, { name ,email, password })
    return response.data
}

export async function getDashboardData(token: string) {
  const res = await axios.get(`${API_URL}/dashboard`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}