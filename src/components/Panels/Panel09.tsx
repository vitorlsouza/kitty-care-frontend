import React, { useEffect, useState } from "react";

interface Panel09Props {
  nextStep: () => void;
  previousStep: () => void;
}

const Panel09: React.FC<Panel09Props> = ({ nextStep, previousStep }) => {
  const [selectedFrequency, setSelectedFrequency] = useState<number | null>(2);

  const frequencyOptions = [
    {
      id: 1,
      title: "Daily",
      description: "Stay on top of your cat’s health and progress every day.",
      isRecommended: false,
    },
    {
      id: 2,
      title: "3 Times a Week",
      description:
        "Our recommended frequency to help you keep your cat on track.",
      isRecommended: true,
    },
    {
      id: 3,
      title: "Weekly",
      description: "Get a weekly update on your cat’s overall health and care.",
      isRecommended: false,
    },
  ];

  // Load data from local storage on mount
  useEffect(() => {
    const storedFrequency = localStorage.getItem("check_in_period");
    if (storedFrequency) {
      const foundOption = frequencyOptions.find(
        (option) => option.title === storedFrequency
      );
      if (foundOption) {
        setSelectedFrequency(foundOption.id);
      }
    }
  }, []);

  const handleCardSelect = (id: number) => {
    setSelectedFrequency(id);
    const selectedOption = frequencyOptions.find((option) => option.id === id);
    if (selectedOption) {
      localStorage.setItem("check_in_period", selectedOption.title);
    }
  };

  const handleSubmit = () => {
    if (selectedFrequency !== null) {
      const selectedOption = frequencyOptions.find(
        (option) => option.id === selectedFrequency
      );
      if (selectedOption) {
        localStorage.setItem("check_in_period", selectedOption.title);
      }
      nextStep();
    }
  };

  return (
    <div className="w-full md:max-w-[1380px] p-6 rounded-md mx-auto relative font-inter">
      <div className="text-center mb-6 lg:mb-8">
        <h1 className="font-extrabold text-xl mb-2 md:mx-56 lg:mx-80">
          How Often Do You Want to Check In With Your Cat?
        </h1>
        <p className="text-sm text-darkGray md:mx-44 lg:mx-72">
          We recommend checking in at least 3 times a week to stay on top of
          your cat’s progress. How often would you like to receive reminders and
          track your cat’s care?
        </p>
      </div>
      <div className="space-y-1 md:mx-32 lg:mx-60">
        {frequencyOptions.map((option) => (
          <div
            key={option.id}
            onClick={() => handleCardSelect(option.id)}
            className={`cursor-pointer lg:h-20 border-2 p-4 lg:px-6 lg:py-2 rounded-2xl text-left transition-all duration-300 ${
              selectedFrequency === option.id
                ? "border-primaryBlue"
                : "border-lightGray2"
            }`}
          >
            <div className="flex justify-between items-center lg:space-x-4">
              <div className="flex flex-col">
                <h3
                  className={`text-md lg:text-lg font-semibold ${
                    selectedFrequency === option.id
                      ? "text-primaryBlue"
                      : "text-black"
                  }`}
                >
                  {option.title}
                  {option.isRecommended && (
                    <span className="bg-primaryBlue text-white text-xs px-2 py-1 rounded-full ml-2">
                      Recommended
                    </span>
                  )}
                </h3>
                <p
                  className={`text-sm ${
                    selectedFrequency === option.id
                      ? "text-primaryBlue"
                      : "text-darkGray"
                  }`}
                >
                  {option.description}
                </p>
              </div>
              <div
                className={`ml-4 lg:ml-auto w-6 h-6 rounded-full border-2 flex justify-center items-center ${
                  selectedFrequency === option.id
                    ? "border-primaryBlue"
                    : "border-lightGray2"
                }`}
              >
                {selectedFrequency === option.id && (
                  <span className="w-3 h-3 rounded-full bg-primaryYellow"></span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center mt-8 space-x-4">
        <button
          onClick={previousStep}
          className="w-full h-[55px] md:w-[115px] md:h-[40px] bg-transparent text-mediumGray border border-mediumGray rounded-2xl hover:text-white hover:border-none hover:bg-primaryBlue"
        >
          {"<"} Back
        </button>
        <button
          onClick={handleSubmit}
          className="px-8 py-2 rounded-full text-white bg-primaryBlue hover:bg-primaryBlue"
        >
          Set My Schedule
        </button>
      </div>
    </div>
  );
};

export default Panel09;
