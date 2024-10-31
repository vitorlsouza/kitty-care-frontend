import axios from 'axios';
import { LoginState, PlanState, SignupState } from '../utils/types';

const API = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL || 'https://kittycare-nodejs.vercel.app',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const signUpAPI = async (userData: SignupState) => {
  try {
    const response = await API.post('/api/supabase/signup', userData);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Signup failed');
  }
};

export const loginAPI = async (credentials: LoginState) => {
  try {
    const response = await API.post('/api/supabase/signin', credentials);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Login failed');
  }
}; 

export const createPlanAPI = async () => {
  try {
    const response = await API.post('/api/supabase/createPlan');
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Create plan failed');
  }
}; 

export const updatePlanAPI = async (credentials: PlanState) => {
  try {
    const response = await API.put('/api/supabase/updatePlan', credentials);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Update plan failed');
  }
};