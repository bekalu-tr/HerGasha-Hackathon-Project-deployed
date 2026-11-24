import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  timeout: 15000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach JWT when using Bearer-token authentication.
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// Centralized response error handling.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      // Do not redirect automatically here.
      // AuthContext and ProtectedRoute handle authentication.
    }

    return Promise.reject(error);
  },
);

export default api;

// Extract a useful message from backend errors.
export const getApiError = (error) => {
  return (
    error.response?.data?.message ||
    error.response?.data?.error ||
    error.message ||
    "Something went wrong. Please try again."
  );
};
