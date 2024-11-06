import React from 'react';
import NavigationButtons from '../NavigationButtons';
import { PanelProps } from './types';
import { useCatForm } from './hooks/useCatForm';

/**
 * Panel06 Component
 * Collects basic information about the user's cat including gender, age, location
 */
const Panel06: React.FC<PanelProps> = ({ nextStep, previousStep }) => {
  const { formData, setFormData, errors, handleSubmit, isValid } = useCatForm(nextStep);

  return (
    <div className="w-full max-w-md lg:max-w-lg p-4 lg:p-6 mx-auto font-inter">
      <header className="text-center mb-6">
        <h1 className="font-bold text-2xl lg:text-3xl mb-2">
          Tell Us About Your Cat
        </h1>
        <p className="text-md text-darkGray mx-12">
          Please provide some basic details about your cat to help us offer the best advice.
        </p>
      </header>

      <div className="space-y-4 mx-16">
        {/* Gender Selection */}
        <div className="text-center">
          <p className="text-md font-medium mb-2">
            Select your cat's gender <span className="text-red-500">*</span>
          </p>
          <div className="flex justify-center space-x-3">
            {['Male', 'Female'].map((option) => (
              <button
                key={option}
                className={`w-44 lg:w-32 px-4 lg:px-9 py-2 rounded-full border ${formData.gender === option ? 'bg-primaryBlue text-white' : 'border-gray-300'
                  }`}
                onClick={() => setFormData({ ...formData, gender: option })}
                type="button"
              >
                {option}
              </button>
            ))}
          </div>
          {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
        </div>

        {/* Age Input */}
        <div className="text-center">
          <p className="text-md font-medium mb-2">
            How old is your cat? <span className="text-red-500">*</span>
          </p>
          <input
            type="number"
            value={formData.age}
            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
            placeholder="Enter your cat's age"
            className="w-full lg:w-3/4 border border-gray-300 px-4 py-2 rounded-full focus:border-primaryBlue focus:outline-none placeholder:text-sm"
          />
          {errors.age && <p className="text-red-500 text-sm">{errors.age}</p>}
        </div>
      </div>

      <NavigationButtons
        nextStep={handleSubmit}
        previousStep={previousStep}
        isNextDisabled={!isValid}
      />
    </div>
  );
};

export default Panel06;
