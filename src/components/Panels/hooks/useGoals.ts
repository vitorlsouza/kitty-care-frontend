import { useState, useEffect } from 'react';
import { MAX_GOALS } from '../constants/goals';

const STORAGE_KEY = 'goals';

export const useGoals = () => {
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);

  useEffect(() => {
    try {
      const storedGoals = localStorage.getItem(STORAGE_KEY);
      if (storedGoals) {
        setSelectedGoals(JSON.parse(storedGoals));
      }
    } catch (error) {
      console.error('Error loading goals from localStorage:', error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(selectedGoals));
    } catch (error) {
      console.error('Error saving goals to localStorage:', error);
    }
  }, [selectedGoals]);

  const handleGoalSelect = (goal: string) => {
    setSelectedGoals(prev => {
      if (prev.includes(goal)) {
        return prev.filter((g) => g !== goal);
      }
      if (prev.length < MAX_GOALS) {
        return [...prev, goal];
      }
      return prev;
    });
  };

  return {
    selectedGoals,
    handleGoalSelect,
  };
}; 