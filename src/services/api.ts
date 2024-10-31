import axios from 'axios';
import { Message } from '../utils/types';

const API = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL || 'https://kittycare-nodejs.vercel.app',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const signUpAPI = async (userData: any) => {
  try {
    const response = await API.post('/api/supabase/signup', userData);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Signup failed');
  }
};

export const loginAPI = async (credentials: { email: string; password: string }) => {
  try {
    const response = await API.post('/api/supabase/signin', credentials);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};

export const chatAPI = async ({ catId, messages }: { catId: string; messages: Message[] }) => {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
    throw new Error("User Not Authenticated");
    }

    const response = await API.post('/api/openai/chat', { catId, messages }, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    
    return response;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Chat request failed');
  }
};

export const getCatsAPI = async () => {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error("User Not Authenticated");
    }

    const response = await API.get('/api/supabase/cats', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to fetch cats');
  }
};

export const updateConversationAPI = async ({ id, messages }: { id: string; messages: Message[] }) => {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error("User Not Authenticated");
    }

    const response = await API.put(`/api/supabase/conversations/${id}`, { messages }, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to update conversation');
  }
};

export const createConversationAPI = async () => {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error("User Not Authenticated");
    }

    const response = await API.post('/api/supabase/conversations', {}, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to create conversation');
  }
};

export const getConversationsAPI = async () => {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error("User Not Authenticated");
    }

    const response = await API.get('/api/supabase/conversations', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to fetch conversations');
  }
}; 

export const getConversationByIdAPI = async (id: string) => {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error("User Not Authenticated");
    }
    
    const response = await API.get(`/api/supabase/conversations/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to fetch conversation');
  }
};