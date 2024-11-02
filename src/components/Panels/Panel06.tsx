import React, { useEffect, useState } from "react";
import NavigationButtons from "../NavigationButtons";

interface Panel06Props {
  nextStep: () => void;
  previousStep: () => void;
}

const Panel06: React.FC<Panel06Props> = ({ nextStep, previousStep }) => {
  const [gender, setGender] = useState<string | null>(null);
  const [age, setAge] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [zipCode, setZipCode] = useState<string>("");

  const [errors, setErrors] = useState({
    gender: "",
    age: "",
    country: "",
    zipCode: "",
  });

  useEffect(() => {
    const storedGender = localStorage.getItem("gender");
    const storedAge = localStorage.getItem("age");
    const storedCountry = localStorage.getItem("country");
    const storedZipCode = localStorage.getItem("zipcode");

    if (storedGender) setGender(storedGender);
    if (storedAge) setAge(storedAge);
    if (storedCountry) setCountry(storedCountry);
    if (storedZipCode) setZipCode(storedZipCode);
  }, []);

  const handleSubmit = () => {
    let hasError = false;
    const newErrors = {
      gender: "",
      age: "",
      country: "",
      zipCode: "",
    };

    if (!gender) {
      newErrors.gender = "Please select your cat's gender";
      hasError = true;
    }

    if (!age) {
      newErrors.age = "Please enter your cat's age";
      hasError = true;
    } else if (isNaN(Number(age)) || Number(age) <= 0) {
      newErrors.age = "Age must be a number greater than zero";
      hasError = true;
    }

    const countryPattern = /^[A-Za-z\s]+$/;
    if (!country) {
      newErrors.country = "Please enter your country";
      hasError = true;
    } else if (!countryPattern.test(country)) {
      newErrors.country =
        "Country must not contain numbers or special characters";
      hasError = true;
    }

    const zipCodePattern = /^[a-zA-Z0-9\s]+$/;
    if (!zipCode) {
      newErrors.zipCode = "Please enter a zip/postal code";
      hasError = true;
    } else if (!zipCodePattern.test(zipCode)) {
      newErrors.zipCode = "Zip code must be alphanumeric";
      hasError = true;
    }

    setErrors(newErrors);

    if (!hasError) {
      localStorage.setItem("gender", gender!);
      localStorage.setItem("age", age);
      localStorage.setItem("country", country);
      localStorage.setItem("zipcode", zipCode);
      nextStep();
    }
  };

  return (
    <div className="w-full max-w-md lg:max-w-lg p-4 lg:p-6 mx-auto font-inter">
      <div className="text-center mb-6">
        <h1 className="font-bold text-2xl lg:text-3xl mb-2">
          Tell Us About Your Cat
        </h1>
        <p className="text-md text-darkGray mx-12">
          Please provide some basic details about your cat to help us offer the
          best advice.
        </p>
      </div>
      <div className="space-y-4 mx-16">
        <div className="text-center">
          <p className="text-md font-medium mb-2">
            Select your cat's gender <span className="text-red-500">*</span>
          </p>
          <div className="flex justify-center space-x-3 ">
            <button
              className={`w-44 lg:w-32 px-4 lg:px-9 py-2 rounded-full border ${gender === "Male"
                ? "bg-primaryBlue text-white"
                : "border-gray-300"
                }`}
              onClick={() => setGender("Male")}
            >
              Male
            </button>
            <button
              className={`w-44 lg:w-32 px-4 lg:px-9 py-2 rounded-full border ${gender === "Female"
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
        <div className="text-center">
          <p className="text-md font-medium mb-2">
            How old is your cat? <span className="text-red-500">*</span>
          </p>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Enter your cat's age"
            className="w-full lg:w-3/4 border border-gray-300 px-4 py-2 rounded-full focus:border-primaryBlue focus:outline-none placeholder:text-sm"
          />
          {errors.age && <p className="text-red-500 text-sm">{errors.age}</p>}
        </div>
        <div className="text-center">
          <p className="text-md font-medium mb-2">
            Which country do you live? <span className="text-red-500">*</span>
          </p>
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="Enter your country"
            className="w-full lg:w-3/4 border border-gray-300 px-4 py-2 rounded-full focus:border-primaryBlue focus:outline-none placeholder:text-sm"
          />
          {errors.country && (
            <p className="text-red-500 text-sm">{errors.country}</p>
          )}
        </div>
        <div className="text-center">
          <p className="text-md font-medium mb-2">
            Zip/Postal Code <span className="text-red-500">*</span>
          </p>
          <input
            type="text"
            // pattern="^\s*?\d{5}(?:[-\s]\d{4})?\s*?$"
            value={zipCode}
            onChange={(e) => {
              setZipCode(e.target.value);
            }}
            placeholder="Enter zip/postal code"
            className="w-full lg:w-3/4 border border-gray-300 px-4 py-2 rounded-full focus:border-primaryBlue focus:outline-none placeholder:text-sm"
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

      <NavigationButtons
        nextStep={handleSubmit}
        previousStep={previousStep}
        isNextDisabled={!gender || !age || !country || !zipCode}
      />
    </div>
  );
};

export default Panel06;
