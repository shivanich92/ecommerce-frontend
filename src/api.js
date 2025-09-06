import axios from 'axios';
export const API_BASE = import.meta.env.VITE_API_BASE || 'https://ecommerce-backend-ovyb.onrender.com';

export const api = axios.create({ baseURL: API_BASE });
api.interceptors.request.use((config)=>{
  const token = localStorage.getItem('token');
  if(token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
