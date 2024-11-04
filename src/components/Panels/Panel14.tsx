import React, { useEffect, useState } from "react";

interface Panel14Props {
  nextStep: () => void;
  previousStep: () => void;
}

const Panel14: React.FC<Panel14Props> = ({ nextStep, previousStep }) => {
  const [selectedGoals, setSelectedGoals] = useState<string[] | string>([]);
  const [keyBarriers, setKeyBarriers] = useState<string[] | string>([]);
  const [progressFocus, setProgressFocus] = useState<string[] | string>([]);

  useEffect(() => {
    let selectedGoals = localStorage.getItem('goals') || '[]';
    if (typeof selectedGoals === 'string') {
      selectedGoals = JSON.parse(selectedGoals);
    }
    let keyBarriers = localStorage.getItem('issues_faced') || '[]';
    if (typeof keyBarriers === 'string') {
      keyBarriers = JSON.parse(keyBarriers);
    }
    let progressFocus = localStorage.getItem('required_progress') || '[]';

    setSelectedGoals(selectedGoals);
    setKeyBarriers(keyBarriers);
    setProgressFocus(progressFocus);
  }, []);


  return (
    <div className="w-full md:max-w-[1380px] p-6 rounded-md mx-auto">
      <div className="text-center mb-6 lg:mb-8">
        <h1 className="font-bold text-xl md:text-2xl lg:text-3xl mb-2 mx-8 md:mx-40 lg:mx-80">
          Congratulations! Your Custom Care Plan Is Ready
        </h1>
        <p className="text-sm md:text-base lg:text-lg text-darkGray px-8 md:mx-36 lg:mx-72">
          Here’s a quick overview of your personalized care plan for your cat
          based on the goals and preferences you shared.
        </p>
      </div>

      <div className="rounded-3xl mx-4 p-6 border-2 border-lightGray bg-lightWhite relative text-center md:mx-8 lg:mx-28">
        <div className="flex justify-center mb-4 absolute top-0 right-1/2 transform translate-x-1/2">
          <span className="bg-primaryOrange text-black font-semibold text-center py-1 px-4 rounded-bl-2xl rounded-br-2xl text-sm md:text-lg border border-mediumGray">
            Overview
          </span>
        </div>

        {
          selectedGoals.length > 0 && (
            <div className="flex flex-col md:flex-row items-center md:items-start justify-center space-y-2 md:space-y-0 mb-4 mt-3 md:mt-5">
              <h3 className="bg-primaryYellow text-black font-medium px-3 py-2 rounded-2xl text-left md:mr-3 md:w-auto w-fit ">
                Selected Goals
              </h3>

              <div className="flex flex-wrap justify-center md:justify-start gap-2">
                {Array.isArray(selectedGoals) ? selectedGoals.map((item, idx) => (
                  <span
                    key={idx}
                    className="bg-white text-mediumGray py-3 px-5 rounded-full text-sm border border-mediumGray"
                  >
                    {item}
                  </span>
                )) : (
                  <span
                    className="bg-white text-mediumGray py-3 px-5 rounded-full text-sm border border-mediumGray"
                  >
                    {selectedGoals}
                  </span>
                )}
              </div>
            </div>
          )
        }

        {
          keyBarriers.length > 0 && (
            <div className="flex flex-col md:flex-row items-center md:items-start justify-center space-y-2 md:space-y-0 mb-4 mt-3 md:mt-5">
              <h3 className="bg-primaryYellow text-black font-medium px-3 py-2 rounded-2xl text-left md:mr-3 md:w-auto w-fit ">
                Key Barriers Identified
              </h3>

              <div className="flex flex-wrap justify-center md:justify-start gap-2">
                {Array.isArray(keyBarriers) ? keyBarriers.map((item, idx) => (
                  <span
                    key={idx}
                    className="bg-white text-mediumGray py-3 px-5 rounded-full text-sm border border-mediumGray"
                  >
                    {item}
                  </span>
                )) : (
                  <span
                    className="bg-white text-mediumGray py-3 px-5 rounded-full text-sm border border-mediumGray"
                  >
                    {keyBarriers}
                  </span>
                )}
              </div>
            </div>
          )
        }

        {
          progressFocus.length > 0 && (
            <div className="flex flex-col md:flex-row items-center md:items-start justify-center space-y-2 md:space-y-0 mb-4 mt-3 md:mt-5">
              <h3 className="bg-primaryYellow text-black font-medium px-3 py-2 rounded-2xl text-left md:mr-3 md:w-auto w-fit ">
                Progress Focus
              </h3>

              <div className="flex flex-wrap justify-center md:justify-start gap-2">
                <span
                  className="bg-white text-mediumGray py-3 px-5 rounded-full text-sm border border-mediumGray"
                >
                  {progressFocus}
                </span>
              </div>
            </div>
          )
        }

      </div>
      <div className="flex justify-center mt-8 gap-2">
        <button
          onClick={previousStep}
          className="w-full h-[55px] md:w-[115px] md:h-[40px] py-2 bg-transparent text-mediumGray border border-mediumGray rounded-2xl hover:text-white hover:border-none hover:bg-primaryBlue"
        >
          {"<"} Back
        </button>
        <button
          onClick={nextStep}
          className="bg-primaryBlue text-white px-6 py-2 rounded-full hover:bg-opacity-90 text-base lg:text-lg"
        >
          See My Report
        </button>
      </div>
    </div>
  );
};

export default Panel14;
