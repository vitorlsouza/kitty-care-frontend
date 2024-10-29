import React from "react";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  currentStep,
  totalSteps,
}) => {
  const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center w-full">
      {steps.map((step, index) => (
        <div key={step} className="flex items-center justify-center ">
          <div className="flex flex-col items-center">
            {step === 1 || step === 6 || step === 10 || step === 15 ? (
              <>
                <img
                  src={
                    currentStep >= step
                      ? "/assets/progress-paw.png"
                      : "/assets/progress-paw-disable.png"
                  }
                  alt={`Step ${step}`}
                  className="w-12 h-12 mt-1 object-cover"
                />

                <p>{step}</p>
              </>
            ) : (
              <div
                className={`w-4 h-4 rounded-full ${
                  currentStep >= step ? "bg-primaryOrange" : "bg-lightGray"
                }`}
              ></div>
            )}
          </div>
          {index < steps.length - 1 && (
            <div className="w-1 md:w-4 lg:w-8 h-2">
              <div
                className={`h-full ${
                  currentStep > step ? "bg-primaryBlue" : "bg-lightGray"
                }`}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProgressBar;
