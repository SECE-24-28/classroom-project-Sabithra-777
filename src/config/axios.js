import axios from 'axios';
import API_BASE_URL from './api';

// Create axios instance with default configuration
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds timeout
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // You can add auth tokens here if needed
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle common errors
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;
      
      switch (status) {
        case 401:
          console.error('Unauthorized - Please check your credentials');
          break;
        case 403:
          console.error('Forbidden - You do not have permission');
          break;
        case 404:
          console.error('Not Found - The requested resource was not found');
          break;
        case 500:
          console.error('Server Error - Please try again later');
          break;
        default:
          console.error('Error:', data?.message || error.message);
      }
    } else if (error.request) {
      // Request was made but no response received
      console.error('Network Error - Please check your connection');
    } else {
      // Something else happened
      console.error('Error:', error.message);
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;

