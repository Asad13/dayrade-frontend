import axios from 'axios';
const baseURL = import.meta.env.VITE_API_BASE_PATH ?? '/api';

export const axiosPublic = axios.create({
  baseURL,
  timeout: 5000,
});

export const axiosPrivate = axios.create({
  baseURL,
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});
