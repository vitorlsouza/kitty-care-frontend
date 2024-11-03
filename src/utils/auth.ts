import { AuthToken } from './types';

export const setAuthToken = (authData: AuthToken) => {
  localStorage.setItem('email', authData.email);
  localStorage.setItem('token', authData.token);
  // Convert expiresIn to timestamp
  const expiresAt = new Date().getTime() + parseExpirationTime(authData.expiresIn);
  localStorage.setItem('expiresAt', expiresAt.toString());
  if(authData.photo)  localStorage.setItem('photo', authData.photo);
};

export const clearTokens = () => {
  const keysToRemove = [
    "token",
    "expiresAt",
    "catId",
    "ConversationId",
    "activity_level",
    "age",
    "breed",
    "check_in_period",
    "country",
    "dietary_restrictions",
    "gender",
    "goals",
    "issues_faced",
    "items",
    "medical_conditions",
    "medications",
    "required_progress",
    "selectedDate",
    "medical_history",
    "target_weight",
    "training_days",
    "unit",
    "weight",
    "zipcode",
    "food_bowls",
    "treats",
    "playtime",
    "subscriptionId"
  ];

  keysToRemove.forEach((key) => localStorage.removeItem(key));
};

export const isAuthenticated = (): null | any => {
  const token = localStorage.getItem('token');
  const expiresAt = localStorage.getItem('expiresAt');
  
  if (!token || !expiresAt) return null;
  
  const isValid = new Date().getTime() < parseInt(expiresAt);
  if(!isValid) return null;
  
  try {
    // Get user info from token
    const payload = token.split('.')[1];
    const user = JSON.parse(atob(payload));
    
    return user;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

// Helper to parse expiration time (e.g., "1h" to milliseconds)
const parseExpirationTime = (expiresIn: string): number => {
  const unit = expiresIn.slice(-1);
  const value = parseInt(expiresIn.slice(0, -1));
  
  switch (unit) {
    case 'd': return value * 24 * 60 * 60 * 1000;
    case 'h': return value * 60 * 60 * 1000;
    case 'm': return value * 60 * 1000;
    case 's': return value * 1000;
    default: return 0;
  }
}; 