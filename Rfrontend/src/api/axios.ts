import axios from 'axios';

const api = axios.create({
  baseURL:  import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false // Important for CORS with credentials
});

export default api;
