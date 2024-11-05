import { useState, useEffect } from 'react';

interface CatFormData {
  gender: string;
  age: string;
}

interface CatFormErrors {
  gender?: string;
  age?: string;
}

export const useCatForm = (nextStep: () => void) => {
  // Initialize form data from localStorage or with default values
  const [formData, setFormData] = useState<CatFormData>(() => {
    const savedData = localStorage.getItem('catFormData');
    return savedData ? JSON.parse(savedData) : {
      gender: '',
      age: '',
    };
  });

  const [errors, setErrors] = useState<CatFormErrors>({});

  // Save to localStorage whenever formData changes
  useEffect(() => {
    localStorage.setItem('catFormData', JSON.stringify(formData));
    localStorage.setItem('gender', formData.gender);
    localStorage.setItem('age', formData.age);
  }, [formData]);

  const validate = () => {
    const newErrors: CatFormErrors = {};
    
    if (!formData.gender) {
      newErrors.gender = 'Please select your cat\'s gender';
    }
    
    if (!formData.age) {
      newErrors.age = 'Please enter your cat\'s age';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      nextStep();
    }
  };

  const isValid = formData.gender && formData.age;

  return {
    formData,
    setFormData,
    errors,
    handleSubmit,
    isValid
  };
}; 