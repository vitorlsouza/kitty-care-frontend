import React, { useState } from "react";

interface Panel02Props {
  nextStep: () => void;
  previousStep: () => void;
}

const Panel02: React.FC<Panel02Props> = ({ nextStep, previousStep }) => {
  // State to track selected goals (max 3)
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);

  const goals = [
    {
      title: "Scratching Less",
      description:
        "Help reduce unwanted scratching behavior on furniture or walls.",
    },
    {
      title: "Lose Weight",
      description:
        "Assist in achieving a healthy weight for your cat through diet and activity.",
    },
    {
      title: "Improve Lifestyle",
      description:
        "Provide a more enriched and stimulating environment for your cat.",
    },
    {
      title: "Train Cat",
      description:
        "Teach your cat new behaviors, from basic commands to advanced tricks.",
    },
    {
      title: "Better Litter Box Habits",
      description: "Improve your cat’s litter box usage and reduce accidents.",
    },
    {
      title: "Reduce Anxiety",
      description:
        "Help your cat manage stress, anxiety, or aggression in different situations.",
    },
    {
      title: "Increase Playtime",
      description:
        "Encourage more active play and improve your cat’s physical health.",
    },
    {
      title: "Socialization",
      description:
        "Help your cat become more comfortable around other pets or people.",
    },
  ];

  // Handle goal selection (max 3)
  const handleGoalSelect = (goal: string) => {
    if (selectedGoals.includes(goal)) {
      setSelectedGoals(selectedGoals.filter((g) => g !== goal));
    } else if (selectedGoals.length < 3) {
      setSelectedGoals([...selectedGoals, goal]);
    }
  };

  return (
    <div className="w-full md:max-w-[1380px] p-6 rounded-md mx-auto">
      {/* Header */}
      <div className="font-Inter text-center mb-10">
        <h1 className="font-bold text-3xl mb-2">
          Let's Choose Some Goals For Your Cat!
        </h1>
        <p className="text-md text-darkGray">
          Select up to 3 goals to focus on for your cat's health and happiness.
        </p>
      </div>

      {/* Goals Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 w-3/4 mx-auto">
        {goals.map((goal) => (
          <div
            key={goal.title}
            onClick={() => handleGoalSelect(goal.title)}
            className={`cursor-pointer border-2 border-lightGray2 py-8 px-6 rounded-lg text-left transition-colors ${
              selectedGoals.includes(goal.title)
                ? "bg-primaryBlue text-white"
                : "border-gray-300 hover:bg-primaryBlue hover:text-white"
            }`}
          >
            <h3 className="text-lg mb-1.5">{goal.title}</h3>

            <p className="text-sm opacity-80">{goal.description}</p>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-center items-center mt-6 space-x-4">
        <button
          onClick={previousStep}
          className="px-6 py-2 bg-transparent text-mediumGray border border-mediumGray rounded-full hover:text-white hover:border-none hover:bg-primaryBlue"
        >
          {'<'} Back
        </button>
        <button
          onClick={nextStep}
          disabled={selectedGoals.length !== 3}
          className={`px-8 py-2 rounded-full text-white ${
            selectedGoals.length === 3
              ? "bg-primaryBlue hover:bg-primaryBlue"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          Next {'>'}
        </button>
      </div>
    </div>
  );
};

export default Panel02;
