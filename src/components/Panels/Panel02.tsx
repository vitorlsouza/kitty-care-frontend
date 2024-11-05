import React from "react";
import NavigationButtons from "../NavigationButtons";
import GoalCard from "./components/GoalCard";
import { useGoals } from "./hooks/useGoals";
import { GOALS, MAX_GOALS } from "./constants/goals";

interface Panel02Props {
  nextStep: () => void;
  previousStep: () => void;
}

/**
 * Panel02 Component
 * Allows users to select up to three goals for their cat's improvement
 */
const Panel02: React.FC<Panel02Props> = ({ nextStep, previousStep }) => {
  const { selectedGoals, handleGoalSelect } = useGoals();

  return (
    <div className="w-full md:max-w-[1380px] p-6 rounded-md mx-auto">
      <div className="font-Inter text-center mb-8">
        <h1 className="font-bold text-3xl mb-2">
          Let's Choose Some Goals For Your Cat!
        </h1>
        <p className="text-md text-darkGray p-5">
          Select up to {MAX_GOALS} goals to focus on for your cat's health and happiness.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6 w-3/4 mx-auto">
        {GOALS.map((goal) => (
          <GoalCard
            key={goal.title}
            goal={goal}
            isSelected={selectedGoals.includes(goal.title)}
            onSelect={handleGoalSelect}
          />
        ))}
      </div>

      <NavigationButtons
        nextStep={nextStep}
        previousStep={previousStep}
        isNextDisabled={selectedGoals.length < MAX_GOALS}
      />
    </div>
  );
};

export default Panel02;
