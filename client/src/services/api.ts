import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('admin_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const contentService = {
  get: <T>(page: string) => api.get<T>(`/content/${page}`).then(res => res.data),
  update: (page: string, data: unknown) => api.put(`/content/${page}`, data).then(res => res.data),
};

export const authService = {
  login: (username: string, password: string) =>
    api.post<{ token: string }>('/auth/login', { username, password }).then(res => res.data),
};

export const uploadService = {
  upload: (file: File, category: string) => {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('category', category);
    return api.post<{ path: string }>('/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }).then(res => res.data);
  },
  delete: (filePath: string) => api.delete('/upload', { data: { filePath } }).then(res => res.data),
};

export const contactService = {
  submit: (data: { name: string; email: string; message: string }) =>
    api.post('/contact', data).then(res => res.data),
};

export default api;
