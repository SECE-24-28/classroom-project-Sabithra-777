import axios from 'axios';

const API_BASE_URL = 'http://localhost:21000/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token') || localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  adminRegister: (adminData) => api.post('/auth/admin/register', adminData),
  adminLogin: (credentials) => api.post('/auth/admin/login', credentials),
};

export const userAPI = {
  getAssignments: (userId) => api.get('/User/assignments', { params: { userId } }),
  submitAssignment: (formData) => api.post('/User/submitTest', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  getUserSubmissions: (userId) => api.get('/User/submissions', { params: { userId } }),
  createRequest: (requestData) => api.post('/User/createRequest', requestData),
};

export const adminAPI = {
  getPendingRequests: (adminId) => api.get('/Admin/getRequests', { params: { id: adminId } }),
  acceptUser: (data) => api.post('/Admin/acceptorDelete', data),
  createAssignment: (data) => api.post('/Admin/createAssignment', data),
  getResults: (data) => api.post('/Admin/fetchResult', data),
  getAssignmentByName: (assignmentName, adminId) => api.get('/Admin/getAssignmentByName', { 
    params: { assignmentName, adminId } 
  }),
  gradeSubmission: (data) => api.post('/Admin/gradeSubmission', data),
};

export default api;