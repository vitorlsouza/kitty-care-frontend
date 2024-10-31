import React, { useState } from "react";
import NavigationButtons from "../NavigationButtons";

interface Panel07Props {
  nextStep: () => void;
  previousStep: () => void;
}

const Panel07: React.FC<Panel07Props> = ({ nextStep, previousStep }) => {
  const [breed, setBreed] = useState<string | null>(null);
  const [weight, setWeight] = useState<string>("");
  const [unit, setUnit] = useState<"Kg" | "Lbs" | null>("Lbs");
  const [targetWeight, setTargetWeight] = useState<string>("");

  const [errors, setErrors] = useState({
    breed: "",
    weight: "",
    unit: "",
    targetWeight: "",
  });

  const breeds = [
    "Domestic shorthair",
    "Domestic longhair",
    "Maine coon",
    "Siamese",
    "Persian",
  ];
  const handleSubmit = () => {
    let hasError = false;
    const newErrors = {
      breed: "",
      weight: "",
      unit: "",
      targetWeight: "",
    };
    if (!breed) {
      newErrors.breed = "Please select your cat's breed";
      hasError = true;
    }
    if (!weight || isNaN(Number(weight)) || Number(weight) <= 0) {
      newErrors.weight = "Please enter a valid weight for your cat";
      hasError = true;
    }
    if (!unit) {
      newErrors.unit = "Please select the weight unit";
      hasError = true;
    }
    if (
      !targetWeight ||
      isNaN(Number(targetWeight)) ||
      Number(targetWeight) <= 0
    ) {
      newErrors.targetWeight = "Please enter a valid target weight";
      hasError = true;
    }

    setErrors(newErrors);

    if (!hasError) {
      nextStep();
    }
  };

  return (
    <div className="w-full max-w-md lg:max-w-lg p-4 lg:p-6 mx-auto">
      <div className="text-center mb-6">
        <h1 className="font-bold text-2xl lg:text-3xl mb-2">
          Tell Us More About Your Cat's Breed and Weight
        </h1>
        <p className="text-md text-darkGray mx-12">
          To better understand your cat's needs, please share their breed,
          current weight, and target weight.
        </p>
      </div>
      <div className="space-y-4 mx-16">
        <div className="text-center">
          <p className="text-md font-medium mb-2">
            What breed is your cat? <span className="text-red-500">*</span>
          </p>
          <div className="relative inline-block w-full lg:w-3/4">
            <select
              value={breed ?? ""}
              onChange={(e) => setBreed(e.target.value)}
              className="block w-full border border-gray-300 bg-white px-4 py-2 pr-8 rounded-full focus:border-primaryBlue focus:outline-none"
            >
              <option value="" disabled>
                Select breed
              </option>
              {breeds.map((b) => (
                <option
                  key={b}
                  value={b}
                  className="bg-gray-100 hover:bg-gray-200"
                >
                  {b}
                </option>
              ))}
            </select>
            {errors.breed && (
              <p className="text-red-500 text-sm">{errors.breed}</p>
            )}
          </div>
        </div>
        <div className="text-center">
          <p className="text-md font-medium mb-2">
            Weight of your cat? <span className="text-red-500">*</span>
          </p>
          <div className="flex justify-center items-center space-x-4">
            <button
              onClick={() => setUnit("Lbs")}
              className={`px-4 py-2 rounded-full border ${
                unit === "Lbs" ? "bg-primaryBlue text-white" : "border-gray-300"
              }`}
            >
              Lbs
            </button>
            <input
              type="text"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="Weight"
              className="w-full lg:w-2/3 border border-gray-300 px-4 py-2 rounded-full focus:outline-none focus:border-primaryBlue"
            />
            <button
              onClick={() => setUnit("Kg")}
              className={`px-4 py-2 rounded-full border ${
                unit === "Kg" ? "bg-primaryBlue text-white" : "border-gray-300"
              }`}
            >
              Kg
            </button>
          </div>
          {errors.weight && (
            <p className="text-red-500 text-sm">{errors.weight}</p>
          )}
          {errors.unit && <p className="text-red-500 text-sm">{errors.unit}</p>}
        </div>
        <div className="text-center">
          <p className="text-md font-medium mb-2">
            Target Weight <span className="text-red-500">*</span>
          </p>
          <input
            type="text"
            value={targetWeight}
            onChange={(e) => setTargetWeight(e.target.value)}
            placeholder="Enter cat's ideal target weight"
            className="w-full lg:w-3/4 border border-gray-300 px-4 py-2 rounded-full focus:border-primaryBlue focus:outline-none"
          />
          <p className="text-sm text-mediumGray mt-2 px-6 md:px-12">
            Tip: If you're unsure, we can help determine the ideal weight based
            on breed and activity level. Example: 8 lbs or 3.6 Kg
          </p>
          {errors.targetWeight && (
            <p className="text-red-500 text-sm">{errors.targetWeight}</p>
          )}
        </div>
      </div>
      <NavigationButtons
        nextStep={nextStep}
        previousStep={previousStep}
        isNextDisabled={!breed || !weight || !unit || !targetWeight}
      />
    </div>
  );
};

export default Panel07;
