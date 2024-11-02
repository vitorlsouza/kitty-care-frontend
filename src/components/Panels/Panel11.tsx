import React, { useEffect, useState } from "react";
import NavigationButtons from "../NavigationButtons";

interface Panel11Props {
  nextStep: () => void;
  previousStep: () => void;
}

const Panel11: React.FC<Panel11Props> = ({ nextStep, previousStep }) => {
  const [medicalCondition, setMedicalCondition] = useState<string | null>(null);
  const [medication, setMedication] = useState<string>("");
  const [dietaryRestrictions, setDietaryRestrictions] = useState<string>("");
  const [surgeryHistory, setSurgeryHistory] = useState<string>("");

  const medicalConditions = [
    "diabetes",
    "obesity",
    "allergies",
    "arthritis",
    "urinary tract issues",
    "dental problems",
    "respiratory issues",
    "other",
  ];

  useEffect(() => {
    const storedMedicalCondition = localStorage.getItem("medical_conditions");
    const storedMedication = localStorage.getItem("medications");
    const storedDietaryRestrictions = localStorage.getItem(
      "dietary_restrictions"
    );
    const storedSurgeryHistory = localStorage.getItem("surgery_history");

    if (storedMedicalCondition) {
      setMedicalCondition(storedMedicalCondition);
    }
    if (storedMedication) {
      setMedication(storedMedication);
    }
    if (storedDietaryRestrictions) {
      setDietaryRestrictions(storedDietaryRestrictions);
    }
    if (storedSurgeryHistory) {
      setSurgeryHistory(storedSurgeryHistory);
    }
  }, []);

  const handleSubmit = () => {
    localStorage.setItem("medical_conditions", medicalCondition || "");
    localStorage.setItem("medications", medication);
    localStorage.setItem("dietary_restrictions", dietaryRestrictions);
    localStorage.setItem("surgery_history", surgeryHistory);

    nextStep();
  };

  return (
    <div className="w-full max-w-md lg:max-w-2xl mx-auto p-4 lg:p-6 font-inter">
      <div className="text-center mb-6">
        <h1 className="font-bold text-2xl mb-2 mx-4 md:mx-2 px-4 lg:px-0 md:px-0">
          Any Medical History We Should Be Aware Of?
        </h1>
        <p className="text-sm lg:text-md text-darkGray mx-4 px-5 lg:px-8">
          Let us know about any medical conditions or special needs your cat has
          so we can tailor our advice to their health.
        </p>
      </div>

      <div className="space-y-4 lg:px-44">
        <div className="text-center">
          <label className="block text-sm font-medium mb-0.5">
            Medical Conditions
          </label>
          <select
            value={medicalCondition || ""}
            onChange={(e) => {
              const selectedValue = e.target.value;
              setMedicalCondition(selectedValue);
              localStorage.setItem("medical_conditions", selectedValue);
            }}
            className="w-full font-inter border border-gray-300 px-4 py-2 rounded-full focus:outline-none focus:border-primaryBlue placeholder:text-xs md:placeholder:text-sm text-sm placeholder:text-mediumGray"
          >
            <option value="" disabled className="bg-lightWhite text-sm">
              Select a condition
            </option>
            {medicalConditions.map((condition) => (
              <option
                key={condition}
                value={condition}
                className="bg-lightWhite text-sm"
              >
                {condition}
              </option>
            ))}
          </select>
        </div>

        <div className="text-center">
          <label className="block text-sm font-medium mb-0.5">
            Medications
          </label>
          <input
            type="text"
            value={medication}
            onChange={(e) => {
              const value = e.target.value;
              setMedication(value);
              localStorage.setItem("medications", value);
            }}
            placeholder="Enter current medication"
            className="w-full font-inter border border-gray-300 px-4 py-2 rounded-full focus:outline-none focus:border-primaryBlue placeholder:text-xs md:placeholder:text-sm text-sm placeholder:text-mediumGray"
          />
        </div>

        <div className="text-center">
          <label className="block text-sm font-medium mb-0.5">
            Dietary Restrictions
          </label>
          <input
            type="text"
            value={dietaryRestrictions}
            onChange={(e) => {
              const value = e.target.value;
              setDietaryRestrictions(value);
              localStorage.setItem("dietary_restrictions", value);
            }}
            placeholder="Enter food allergies"
            className="w-full font-inter border border-gray-300 px-4 py-2 rounded-full focus:outline-none focus:border-primaryBlue placeholder:text-xs md:placeholder:text-sm text-sm placeholder:text-mediumGray"
          />
        </div>

        <div className="text-center">
          <label className="block text-sm font-medium mb-0.5">
            Surgery History
          </label>
          <input
            type="text"
            value={surgeryHistory}
            onChange={(e) => {
              const value = e.target.value;
              setSurgeryHistory(value);
              localStorage.setItem("surgery_history", value);
            }}
            placeholder="Enter recent surgeries"
            className="w-full font-inter border border-gray-300 px-4 py-2 rounded-full focus:outline-none focus:border-primaryBlue placeholder:text-xs md:placeholder:text-sm text-sm placeholder:text-mediumGray"
          />
        </div>
      </div>

      <div className="flex flex-col items-center mt-8">
        <button
          onClick={handleSubmit}
          className={`px-8 py-2 rounded-full text-white ${medicalCondition &&
            medication &&
            dietaryRestrictions &&
            surgeryHistory
            ? "bg-primaryBlue hover:bg-primaryBlue"
            : "bg-gray-300 cursor-not-allowed"
            }`}
          disabled={
            !medicalCondition ||
            !medication ||
            !dietaryRestrictions ||
            !surgeryHistory
          }
        >
          Submit Medical History
        </button>
        <p className="text-sm text-darkGray mt-4 font-light px-8 md:mx-12 lg:mx-36 ">
          If your cat has no medical history, you can{" "}
          <span className="text-primaryBlue cursor-pointer" onClick={nextStep}>
            skip this step
          </span>
        </p>
      </div>

      <NavigationButtons
        nextStep={nextStep}
        previousStep={previousStep}
        isNextDisabled={
          !medicalCondition ||
          !medication ||
          !dietaryRestrictions ||
          !surgeryHistory
        }
      />
    </div>
  );
};

export default Panel11;
