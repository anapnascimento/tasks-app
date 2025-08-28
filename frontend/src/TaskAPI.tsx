import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:4000' });

export interface Task {
  id: string;
  text: string;
  completed: boolean;
  createdAt: string;
}

export const TaskAPI = {
  getAll: () => API.get<Task[]>('/tasks').then(res => res.data),
  create: (text: string) => API.post<Task>('/tasks', { text }).then(res => res.data),
  toggle: (id: string) => API.put<Task>(`/tasks/${id}/toggle`).then(res => res.data),
  remove: (id: string) => API.delete(`/tasks/${id}`),
  update: (id: string, text: string) => API.put<Task>(`/tasks/${id}`, { text }).then(res => res.data),
};
