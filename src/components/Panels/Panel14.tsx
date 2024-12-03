import React from "react";
import { Panel14Props, OverviewSectionProps } from "./types/panel.types";
import { useLocalStorage } from "./hooks/useLocalStorage";
import Suggestions from "./Panel15/components/Suggestions";
import { useNavigate } from "react-router-dom";
const LOCAL_STORAGE_KEYS = {
  GOALS: 'goals',
  ISSUES_FACED: 'issues_faced',
  REQUIRED_PROGRESS: 'required_progress',
} as const;

const OverviewSection: React.FC<OverviewSectionProps> = ({ title, items }) => {
  if (!items || (Array.isArray(items) && items.length === 0)) return null;

  return (
    <div className="flex flex-col md:flex-row items-center md:items-start justify-center space-y-2 md:space-y-0 mb-4 mt-3 md:mt-5">
      <h3 className="bg-primaryYellow text-black font-medium px-3 py-2 rounded-2xl text-left md:mr-3 md:w-auto w-fit">
        {title}
      </h3>
      <div className="flex flex-wrap justify-center md:justify-start gap-2">
        {Array.isArray(items) ? (
          items.map((item, idx) => (
            <span
              key={idx}
              className="bg-white text-mediumGray py-3 px-5 rounded-full text-sm border border-mediumGray"
            >
              {item}
            </span>
          ))
        ) : (
          <span className="bg-white text-mediumGray py-3 px-5 rounded-full text-sm border border-mediumGray">
            {items}
          </span>
        )}
      </div>
    </div>
  );
};

const Panel14: React.FC<Panel14Props> = ({ previousStep }) => {
  const navigate = useNavigate();

  const [selectedGoals] = useLocalStorage<string[] | string>(LOCAL_STORAGE_KEYS.GOALS, []);
  const [keyBarriers] = useLocalStorage<string[] | string>(LOCAL_STORAGE_KEYS.ISSUES_FACED, []);
  const [progressFocus] = useLocalStorage<string[] | string>(LOCAL_STORAGE_KEYS.REQUIRED_PROGRESS, "");

  return (
    <div className="w-full md:max-w-[1380px] p-6 rounded-md mx-auto">
      <div className="text-center mb-6 lg:mb-8">
        <h1 className="font-bold text-xl md:text-2xl lg:text-3xl mb-2 mx-8 md:mx-40 lg:mx-80">
          Congratulations! Your Custom Care Plan Is Ready
        </h1>
        <p className="text-sm md:text-base lg:text-lg text-darkGray px-8 md:mx-36 lg:mx-72">
          Here's a quick overview of your personalized care plan for your cat
          based on the goals and preferences you shared.
        </p>
      </div>

      <div className="rounded-3xl mx-4 p-6 border-2 border-lightGray bg-lightWhite relative text-center md:mx-8 lg:mx-28">
        <div className="flex justify-center mb-4 absolute top-0 right-1/2 transform translate-x-1/2">
          <span className="bg-primaryOrange text-black font-semibold text-center py-1 px-4 rounded-bl-2xl rounded-br-2xl text-sm md:text-lg border border-mediumGray">
            Overview
          </span>
        </div>

        <OverviewSection title="Selected Goals" items={selectedGoals} />
        <OverviewSection title="Key Barriers Identified" items={keyBarriers} />
        <OverviewSection title="Progress Focus" items={progressFocus} />
      </div>

      <Suggestions horizontal />

      <div className="flex justify-center mt-8 gap-2">
        <button
          onClick={previousStep}
          className="w-full h-[55px] md:w-[115px] md:h-[40px] py-2 bg-transparent text-mediumGray border border-mediumGray rounded-2xl hover:text-white hover:border-none hover:bg-primaryBlue"
        >
          {"<"} Back
        </button>
        <button
          onClick={() => {
            if (localStorage.getItem("email")) {
              navigate("/cat-assistant");
            } else {
              navigate("/signup");
            }
          }}
          className="bg-primaryBlue text-white px-6 py-2 rounded-2xl hover:bg-opacity-90"
        >
          Start Your Journey
        </button>
      </div>
    </div>
  );
};

export default Panel14;
