import { useState } from 'react';


interface CatFormErrors {
  gender?: string;
  age?: string;
}

export const useCatForm = (nextStep: () => void) => {
  const [gender, setGender] = useState<string>(localStorage.getItem('gender') || '');
  const [age, setAge] = useState<string>(localStorage.getItem('age') || '');

  const [errors, setErrors] = useState<CatFormErrors>({});

  const validate = () => {
    const newErrors: CatFormErrors = {};
    
    if (!gender) {
      newErrors.gender = 'Please select your cat\'s gender';
    }
    
    if (!age) {
      newErrors.age = 'Please enter your cat\'s age';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      localStorage.setItem('gender', gender || '');
      localStorage.setItem('age', age || '');

      nextStep();
    }
  };

  const isValid = gender && age;

  return {
    gender,
    setGender,
    age,
    setAge,
    errors,
    handleSubmit,
    isValid
  };
}; 