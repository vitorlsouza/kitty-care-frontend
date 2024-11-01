import React, { useMemo } from "react";

interface NavigationButtonsProps {
  nextStep: () => void;
  previousStep: () => void;
  isNextDisabled: boolean;
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  nextStep,
  previousStep,
  isNextDisabled,
}) => {
  const navButtonUI = useMemo(() => {
    return (
      <div className="flex flex-col-reverse gap-2 md:gap-4 mx-8 md:mx-0 md:flex-row justify-center items-center mt-6 space-y-4 md:space-y-0 ">
        {/* Back Button */}
        <button
          onClick={previousStep}
          className="w-full h-[55px]  md:w-[115px] md:h-[40px] bg-transparent text-mediumGray border border-mediumGray rounded-2xl hover:text-white hover:border-none hover:bg-primaryBlue"
        >
          {"<"} Back
        </button>
        {/* Next Button */}
        <button
          onClick={nextStep}
          disabled={isNextDisabled}
          className={`w-full h-[55px] md:w-[115px] md:h-[40px] rounded-2xl ${
            isNextDisabled
              ? "bg-lightGray text-mediumGray cursor-not-allowed"
              : "bg-primaryBlue text-white hover:bg-opacity-90"
          }`}
        >
          Next {">"}
        </button>
      </div>
    );
  }, [isNextDisabled]);
  return <>{navButtonUI}</>;
};

export default NavigationButtons;
