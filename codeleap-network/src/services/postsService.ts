// src/services/postsService.ts
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/careers/';

export const postsService = {
  getAll: async (pageUrl?: string, search?: string) => {
    
    if (pageUrl) {
        const response = await axios.get(pageUrl);
        return response.data;
    }

    const params: any = {};
    if (search) params.search = search;

    const response = await axios.get(API_URL, { params });
    return response.data;
  },

  create: async (username: string, title: string, content: string) => {
    const payload = { username, title, content };
    return await axios.post(API_URL, payload);
  },

  delete: async (id: number) => {
    return await axios.delete(`${API_URL}${id}/`);
  },

  update: async (id: number, data: { title: string; content: string }) => {
    return await axios.patch(`${API_URL}${id}/`, data);
  },
  toggleLike: async (id: number, username: string) => { 
    const response = await axios.post(`${API_URL}${id}/like/`, { username });
    return response.data;
  }
};