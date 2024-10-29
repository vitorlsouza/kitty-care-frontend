import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || 'https://kittycare-nodejs.vercel.app',
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