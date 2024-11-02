import React, { useEffect } from "react";

interface Panel01Props {
  nextStep: () => void;
}

const Panel01: React.FC<Panel01Props> = ({ nextStep }) => {
  useEffect(() => {
    const keysToRemove = [
      "activity_level",
      "age",
      "breed",
      "check_in_period",
      "country",
      "dietary_restrictions",
      "gender",
      "goals",
      "issues_faced",
      "items",
      "medical_conditions",
      "medications",
      "required_progress",
      "selectedDate",
      "medical_history",
      "target_weight",
      "training_days",
      "unit",
      "weight",
      "zipcode",
    ];

    keysToRemove.forEach((key) => localStorage.removeItem(key));
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-start px-4 py-2 md:p-4 globalBackground">
      <div className="w-full max-w-4xl mx-auto">
        <div className="flex flex-col items-center justify-center w-full max-w-md md:mt-8 mx-auto text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-black font-inter">
            Welcome To The Feline Family!
          </h1>
          <p className="text-md md:text-lg font-light px-3 py-2 sm:px-5 sm:py-3 text-darkGray">
            Thank you for subscribing! 🎉 You’re now part of the best feline
            companion community. We’re excited to help you and your cat achieve
            all your goals!
          </p>
        </div>

        <div className="mt-10 md:mt-2 rounded-3xl w-full max-w-md mx-auto h-auto flex flex-col justify-start items-center border-2 border-lightPearl bg-[url('/assets/White-paw.png')] bg-no-repeat bg-right-bottom bg-cover">
          <h2 className="bg-primaryOrange text-black text-sm sm:text-lg rounded-b-2xl font-semibold py-2 px-5 w-full max-w-[249px] text-center">
            Feature Highlights
          </h2>
          <h2 className="text-center mt-3 sm:mt-4 font-semibold text-sm sm:text-base">
            Here’s what you’ll get with your subscription
          </h2>

          <div className="flex justify-center items-center mb-5">
            <ul className="mt-4 space-y-3 w-full max-w-sm sm:max-w-md flex flex-col items-start px-4">
              <li className="flex items-center relative">
                <img
                  src="/assets/Frame.png"
                  alt="Checkbox"
                  className="absolute left-0 w-5 h-5 sm:w-6 sm:h-6"
                />
                <span className="pl-8 text-sm sm:text-base">
                  Unlimited access to personalized advice
                </span>
              </li>
              <li className="flex items-center relative">
                <img
                  src="/assets/Frame.png"
                  alt="Checkbox"
                  className="absolute left-0 w-5 h-5 sm:w-6 sm:h-6"
                />
                <span className="pl-8 text-sm sm:text-base">
                  Health and training guidance tracking
                </span>
              </li>
              <li className="flex items-center relative">
                <img
                  src="/assets/Frame.png"
                  alt="Checkbox"
                  className="absolute left-0 w-5 h-5 sm:w-6 sm:h-6"
                />
                <span className="pl-8 text-sm sm:text-base">
                  Exclusive tips and expert support
                </span>
              </li>
              <li className="flex items-center relative">
                <img
                  src="/assets/Frame.png"
                  alt="Checkbox"
                  className="absolute left-0 w-5 h-5 sm:w-6 sm:h-6"
                />
                <span className="pl-8 text-sm sm:text-base">
                  Early access to new features and content
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-lightOrange flex flex-col justify-center items-center mt-4 sm:mt-1 rounded-3xl w-full max-w-md mx-auto p-6 sm:px-10 sm:py-10 border-2 border-pearlBush">
          <p className="text-black text-sm sm:text-lg text-center">
            Get started by answering a few questions. This will help us create
            your personalized dashboard.
          </p>
        </div>

        <div className="flex justify-center mt-8 sm:mt-10">
          <button
            onClick={nextStep}
            className="bg-primaryBlue text-white px-6 sm:px-8 py-2 sm:py-3 rounded-2xl hover:bg-opacity-90"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Panel01;
