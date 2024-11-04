import { useEffect } from 'react';
import { LOCAL_STORAGE_KEYS } from '../constants';

export const useLocalStorageCleanup = () => {
  useEffect(() => {
    LOCAL_STORAGE_KEYS.forEach((key) => localStorage.removeItem(key));
  }, []);
}; 