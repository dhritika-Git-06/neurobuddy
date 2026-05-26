import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
};

export const userAPI = {
  getProfile: () => api.get('/user/profile'),
  getAnalytics: () => api.get('/user/analytics'),
  getPublicProfile: (userId) => api.get(`/user/public/${userId}`),
};

export const subjectAPI = {
  getAll: () => api.get('/subjects'),
  getById: (id) => api.get(`/subjects/${id}`),
};

export const videoAPI = {
  getProgress: () => api.get('/videos/progress'),
  updateProgress: (data) => api.put('/videos/progress', data),
};

export const quizAPI = {
  getBySubject: (subjectId) => api.get(`/quizzes/subject/${subjectId}`),
  getQuiz: (subjectId, quizId) => api.get(`/quizzes/${subjectId}/${quizId}`),
  submit: (data) => api.post('/quizzes/submit', data),
};

export const chatAPI = {
  sendMessage: (data) => api.post('/chat/message', data),
  getHistory: (botType) => api.get(`/chat/history/${botType}`),
  getThreadMessages: (threadId) => api.get(`/chat/thread/${threadId}`),
};

export const leaderboardAPI = {
  getLeaderboard: (fieldOfStudy) => api.get('/leaderboard', { params: { fieldOfStudy } }),
};

export default api;
