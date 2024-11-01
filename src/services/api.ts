import axios from 'axios';
import { Message, LoginState, PlanState, SignupState } from '../utils/types';

const baseURL = import.meta.env.VITE_BASE_API_URL || 'https://kittycare-nodejs.vercel.app';

const API = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const signUpAPI = async (userData: SignupState) => {
  try {
    const response = await API.post('/api/supabase/signup', userData);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || error.response?.data?.message || 'Signup failed');
  }
};

export const loginAPI = async (credentials: LoginState) => {
  try {
    const response = await API.post('/api/supabase/signin', credentials);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || error.response?.data?.message || 'Login failed');
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
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || error.response?.data?.message || 'Chat request failed');
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
    throw new Error(error.response?.data?.error || error.response?.data?.message || 'Failed to fetch cats');
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
    throw new Error(error.response?.data?.error || error.response?.data?.message || 'Failed to update conversation');
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
    throw new Error(error.response?.data?.error || error.response?.data?.message || 'Failed to create conversation');
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
    throw new Error(error.response?.data?.error || error.response?.data?.message || 'Failed to fetch conversations');
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
    throw new Error(error.response?.data?.error || error.response?.data?.message || 'Failed to fetch conversation');
  }
};


export const createPlanAPI = async () => {
  try {
    const response = await API.post('/api/supabase/createPlan');
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || error.response?.data?.message || 'Create plan failed');
  }
}; 

export const updatePlanAPI = async (credentials: PlanState) => {
  try {
    const response = await API.put('/api/supabase/updatePlan', credentials);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || error.response?.data?.message || 'Update plan failed');
  }
};

export default baseURL;
