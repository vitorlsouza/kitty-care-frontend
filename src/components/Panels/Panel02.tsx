import React from "react";
import { MEDICAL_CONDITIONS } from "./constants/medicalConditions";
import { useMedicalHistory } from "./hooks/useMedicalHistory";
import NavigationButtons from "../NavigationButtons";
import { Panel02Props } from "../../types/panel.types";

const Panel02: React.FC<Panel02Props> = ({ nextStep, previousStep }) => {
  const { formData, updateFormField, isFormValid } = useMedicalHistory();

  const renderFormField = (
    label: string,
    placeholder: string,
    field: keyof typeof formData
  ) => (
    <div className="text-center">
      <label className="block text-sm font-medium mb-0.5">{label}</label>
      <input
        type="text"
        value={formData[field] || ''}
        onChange={(e) => updateFormField(field, e.target.value)}
        placeholder={placeholder}
        className="w-full font-inter border border-gray-300 px-4 py-2 rounded-full focus:outline-none focus:border-primaryBlue placeholder:text-xs md:placeholder:text-sm text-sm placeholder:text-mediumGray"
      />
    </div>
  );

  return (
    <div className="w-full max-w-md lg:max-w-2xl mx-auto p-4 lg:p-6 font-inter">
      <div className="text-center mb-6">
        <h1 className="font-bold text-2xl mb-2 mx-4 md:mx-2 px-3 lg:px-0 md:px-0">
          Any Medical History We Should Be Aware Of?
        </h1>
        <p className="text-sm lg:text-md text-darkGray mx-4 px-4 lg:px-8">
          Let us know about any medical conditions or special needs your cat has
          so we can tailor our advice to their health.
        </p>
      </div>

      <div className="space-y-4 px-8 lg:px-40">
        <div className="text-center">
          <label className="block text-sm font-medium mb-0.5">
            Medical Conditions
          </label>
          <select
            value={formData.medicalCondition || ""}
            onChange={(e) => updateFormField("medicalCondition", e.target.value)}
            className="w-full font-inter border border-gray-300 px-4 py-2 rounded-full capitalize focus:outline-none focus:border-primaryBlue placeholder:text-xs md:placeholder:text-sm text-sm placeholder:text-mediumGray"
          >
            <option value="" disabled className="bg-lightWhite text-sm">
              Select a condition
            </option>
            {MEDICAL_CONDITIONS.map((condition) => (
              <option
                key={condition}
                value={condition}
                className="bg-lightWhite text-sm capitalize"
              >
                {condition}
              </option>
            ))}
          </select>
        </div>

        {renderFormField("Medications", "Enter current medication", "medication")}
        {renderFormField("Dietary Restrictions", "Enter food allergies", "dietaryRestrictions")}
        {renderFormField("Surgery History", "Enter recent surgeries", "surgeryHistory")}
      </div>

      <div className="flex flex-col items-center mt-8 text-center">
        <p className="text-sm text-darkGray mt-4 font-light px-8 md:mx-12 lg:mx-36">
          If your cat has no medical history, you can{" "}
          <span className="text-primaryBlue cursor-pointer" onClick={nextStep}>
            skip this step
          </span>
        </p>
      </div>

      <NavigationButtons
        nextStep={nextStep}
        previousStep={previousStep}
        isNextDisabled={!isFormValid()}
      />
    </div>
  );
};

export default Panel02;
