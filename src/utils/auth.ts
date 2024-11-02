import { AuthToken } from './types';

export const setAuthToken = (authData: AuthToken) => {
  localStorage.setItem('token', authData.token);
  // Convert expiresIn to timestamp
  const expiresAt = new Date().getTime() + parseExpirationTime(authData.expiresIn);
  localStorage.setItem('expiresAt', expiresAt.toString());
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
    "surgery_history",
    "target_weight",
    "training_days",
    "unit",
    "weight",
    "zipcode",
    "food_bowls",
    "treats",
    "playtime",
  ];

  keysToRemove.forEach((key) => localStorage.removeItem(key));
};

export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem('token');
  const expiresAt = localStorage.getItem('expiresAt');
  
  if (!token || !expiresAt) return false;
  
  return new Date().getTime() < parseInt(expiresAt);
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