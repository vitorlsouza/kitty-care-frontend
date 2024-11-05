import { useState, useEffect } from 'react';
import { CatBreed, WeightUnit, WEIGHT_REGEX } from '../constants/catBreeds';

interface CatWeightFormErrors {
  breed: string;
  weight: string;
  unit: string;
  targetWeight: string;
}

interface UseCatWeightFormProps {
  onSubmit: () => void;
}

export const useCatWeightForm = ({ onSubmit }: UseCatWeightFormProps) => {
  const [breed, setBreed] = useState<CatBreed | null>(null);
  const [weight, setWeight] = useState<string>("");
  const [unit, setUnit] = useState<WeightUnit>("Lbs");
  const [targetWeight, setTargetWeight] = useState<string>("");
  const [errors, setErrors] = useState<CatWeightFormErrors>({
    breed: "",
    weight: "",
    unit: "",
    targetWeight: "",
  });

  useEffect(() => {
    // Load stored values
    const storedBreed = localStorage.getItem("breed") as CatBreed;
    const storedWeight = localStorage.getItem("weight");
    const storedUnit = localStorage.getItem("unit") as WeightUnit;
    const storedTargetWeight = localStorage.getItem("target_weight");

    if (storedBreed) setBreed(storedBreed);
    if (storedWeight) setWeight(storedWeight);
    if (storedUnit) setUnit(storedUnit);
    if (storedTargetWeight) setTargetWeight(storedTargetWeight);
  }, []);

  useEffect(() => {
    // Save values to localStorage
    if (breed) localStorage.setItem("breed", breed);
    if (weight) localStorage.setItem("weight", parseFloat(weight).toFixed(2));
    if (unit) localStorage.setItem("unit", unit);
    if (targetWeight) localStorage.setItem("target_weight", parseFloat(targetWeight).toFixed(2));
  }, [breed, weight, unit, targetWeight]);

  const validateForm = (): boolean => {
    const newErrors = {
      breed: "",
      weight: "",
      unit: "",
      targetWeight: "",
    };
    let isValid = true;

    if (!breed) {
      newErrors.breed = "Please select your cat's breed";
      isValid = false;
    }

    if (!weight || !WEIGHT_REGEX.test(weight) || parseFloat(weight) <= 0) {
      newErrors.weight = "Please enter a valid weight for your cat (e.g., 8.5)";
      isValid = false;
    }

    if (!unit) {
      newErrors.unit = "Please select the weight unit";
      isValid = false;
    }

    if (!targetWeight || !WEIGHT_REGEX.test(targetWeight) || parseFloat(targetWeight) <= 0) {
      newErrors.targetWeight = "Please enter a valid target weight (e.g., 8.5)";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit();
    }
  };

  return {
    breed,
    setBreed,
    weight,
    setWeight,
    unit,
    setUnit,
    targetWeight,
    setTargetWeight,
    errors,
    handleSubmit,
    isFormValid: !!breed && !!weight && !!unit && !!targetWeight,
  };
}; 