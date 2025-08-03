import axios from 'axios';
import toast from 'react-hot-toast';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { response } = error;
    
    if (response && response.status === 401) {
      // Only handle authentication errors automatically
      const isAuthRoute = window.location.pathname === '/login' || window.location.pathname === '/register';
      
      if (!isAuthRoute) {
        toast.error('Session expired - Please login again');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
    }
    
    return Promise.reject(error);
  }
);

// Helper function to show success toasts
export const showSuccess = (message) => {
  toast.success(message);
};

// Helper function to show error toasts
export const showError = (message) => {
  toast.error(message);
};

// Helper function to show loading toasts
export const showLoading = (message = 'Loading...') => {
  return toast.loading(message);
};

// Helper function to dismiss loading toast
export const dismissLoading = (toastId) => {
  toast.dismiss(toastId);
};

export default api;