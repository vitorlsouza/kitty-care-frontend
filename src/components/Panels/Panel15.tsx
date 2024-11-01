import React from "react";
import Suggestions from "./Panel15Components/Suggestions";
import Timeline from "./Panel15Components/Timeline";
import DateSelection from "./Panel15Components/DateSelection";
import EnvironmentalEnrichmentSuggestions from "./Panel15Components/EnvironmentalEnrichmentSuggestions";

interface Panel15Props {
  previousStep: () => void;
}

const Panel15: React.FC<Panel15Props> = ({ previousStep }) => {
  return (
    <div className="w-full max-w-md lg:max-w-4xl mx-auto p-4 lg:p-6 font-inter">
      <div className="text-center mb-8">
        <h1 className="font-bold text-xl lg:text-3xl mb-2">
          Your Cat’s Personalized Plan & Insights Let’s Keep Your Cat Healthy
          and Happy!
        </h1>
        <p className="text-sm lg:text-md text-darkGray max-w-2xl mx-auto">
          Here’s your cat’s custom care plan based on everything you’ve told us.
          We’ve tailored this to help you and your cat reach your goals. Let’s
          dive into the details!
        </p>
      </div>

      <Suggestions />
      <Timeline />
      <DateSelection />
      <EnvironmentalEnrichmentSuggestions />

      <div className="flex justify-center mt-8">
        <button
          onClick={previousStep}
          className="w-full h-[55px] md:w-[115px] md:h-[40px] bg-transparent text-mediumGray border border-mediumGray rounded-2xl hover:text-white hover:border-none hover:bg-primaryBlue"
        >
          {"<"} Back
        </button>
      </div>
    </div>
  );
};

export default Panel15;
