import React, { useState } from "react";

interface Panel06Props {
  nextStep: () => void;
  previousStep: () => void;
}

const Panel06: React.FC<Panel06Props> = ({ nextStep, previousStep }) => {
  const [gender, setGender] = useState<string | null>(null);
  const [age, setAge] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [zipCode, setZipCode] = useState<string>("");

  // State to track validation errors
  const [errors, setErrors] = useState({
    gender: "",
    age: "",
    country: "",
    zipCode: "",
  });

  // Handle form submission
  const handleSubmit = () => {
    let hasError = false;
    const newErrors = {
      gender: "",
      age: "",
      country: "",
      zipCode: "",
    };

    // Validate gender
    if (!gender) {
      newErrors.gender = "Please select your cat's gender";
      hasError = true;
    }

    // Validate age (must be a number and greater than zero)
    if (!age) {
      newErrors.age = "Please enter your cat's age";
      hasError = true;
    } else if (isNaN(Number(age)) || Number(age) <= 0) {
      newErrors.age = "Age must be a number greater than zero";
      hasError = true;
    }

    // Validate country (must be a string without numbers)
    const countryPattern = /^[A-Za-z\s]+$/; // Only allow letters and spaces
    if (!country) {
      newErrors.country = "Please enter your country";
      hasError = true;
    } else if (!countryPattern.test(country)) {
      newErrors.country = "Country must not contain numbers or special characters";
      hasError = true;
    }

    // Validate zip code (non-empty check)
    if (!zipCode) {
      newErrors.zipCode = "Please enter a zip/postal code";
      hasError = true;
    }

    setErrors(newErrors);

    // If no errors, move to next step
    if (!hasError) {
      nextStep();
    }
  };

  return (
    <div className="w-full max-w-md lg:max-w-lg p-4 lg:p-6 mx-auto font-inter">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="font-bold text-2xl lg:text-3xl mb-2">
          Tell Us About Your Cat
        </h1>
        <p className="text-md text-darkGray mx-12">
          Please provide some basic details about your cat to help us offer the
          best advice.
        </p>
      </div>

      {/* Form */}
      <div className="space-y-4 mx-16">
        {/* Gender selection */}
        <div className="text-center">
          <p className="text-md font-medium mb-2">
            Select your cat's gender <span className="text-red-500">*</span>
          </p>
          <div className="flex justify-center space-x-3 ">
            <button
              className={`px-4 lg:px-9 py-2 rounded-full border ${
                gender === "Male"
                  ? "bg-primaryBlue text-white"
                  : "border-gray-300"
              }`}
              onClick={() => setGender("Male")}
            >
              Male
            </button>
            <button
              className={`px-4 lg:px-9 py-2 rounded-full border ${
                gender === "Female"
                  ? "bg-primaryBlue text-white"
                  : "border-gray-300"
              }`}
              onClick={() => setGender("Female")}
            >
              Female
            </button>
          </div>
          {errors.gender && (
            <p className="text-red-500 text-sm">{errors.gender}</p>
          )}
        </div>

        {/* Cat's age */}
        <div className="text-center">
          <p className="text-md font-medium mb-2">
            How old is your cat? <span className="text-red-500">*</span>
          </p>
          <input
            type="text"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Enter your cat's age"
            className="w-full lg:w-3/4 border border-gray-300 px-4 py-2 rounded-full focus:border-primaryBlue"
          />
          {errors.age && <p className="text-red-500 text-sm">{errors.age}</p>}
        </div>

        {/* Country */}
        <div className="text-center">
          <p className="text-md font-medium mb-2">
            Which country do you live? <span className="text-red-500">*</span>
          </p>
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="Enter your country"
            className="w-full lg:w-3/4 border border-gray-300 px-4 py-2 rounded-full focus:border-primaryBlue"
          />
          {errors.country && (
            <p className="text-red-500 text-sm">{errors.country}</p>
          )}
        </div>

        {/* Zip Code */}
        <div className="text-center">
          <p className="text-md font-medium mb-2">
            Zip/Postal Code <span className="text-red-500">*</span>
          </p>
          <input
            type="text"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            placeholder="Enter zip/postal code"
            className="w-full lg:w-3/4 border border-gray-300 px-4 py-2 rounded-full focus:border-primaryBlue"
          />
          <p className="text-sm text-mediumGray mt-2 px-4 md:px-6 lg:px-12">
            This can help make insights about your cat based on the area you
            live in.
          </p>
          {errors.zipCode && (
            <p className="text-red-500 text-sm">{errors.zipCode}</p>
          )}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-center items-center mt-8 space-x-4">
        <button
          onClick={previousStep}
          className="px-6 py-2 bg-transparent text-mediumGray border border-mediumGray rounded-full hover:text-white hover:border-none hover:bg-primaryBlue"
        >
          {"<"} Back
        </button>
        <button
          onClick={handleSubmit}
          className={`px-8 py-2 rounded-full text-white ${
            gender && age && country && zipCode
              ? "bg-primaryBlue hover:bg-primaryBlue"
              : "bg-gray-300 cursor-not-allowed"
          }`}
          disabled={!gender || !age || !country || !zipCode}
        >
          Next {">"}
        </button>
      </div>
    </div>
  );
};

export default Panel06;
