import React, { useState, useEffect } from "react";
import NavigationButtons from "../NavigationButtons";

interface Panel02Props {
  nextStep: () => void;
  previousStep: () => void;
}

const Panel02: React.FC<Panel02Props> = ({
  nextStep,
  previousStep,
}) => {
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

  const handleGoalSelect = (goal: string) => {
    if (selectedGoals.includes(goal)) {
      setSelectedGoals(selectedGoals.filter((g) => g !== goal));
    } else if (selectedGoals.length < 3) {
      setSelectedGoals([...selectedGoals, goal]);
    }
  };

  const handleNext = () => {
    nextStep();
  };

  useEffect(() => {
    const storedGoals = localStorage.getItem("goals");
    if (storedGoals) {
      setSelectedGoals(JSON.parse(storedGoals));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("goals", JSON.stringify(selectedGoals));
  }, [selectedGoals]);

  return (
    <div className="w-full md:max-w-[1380px] p-6 rounded-md mx-auto">
      <div className="font-Inter text-center mb-8">
        <h1 className="font-bold text-3xl mb-2">
          Let's Choose Some Goals For Your Cat!
        </h1>
        <p className="text-md text-darkGray p-5">
          Select up to 3 goals to focus on for your cat's health and happiness.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6 w-3/4 mx-auto">
        {goals.map((goal) => (
          <div
            key={goal.title}
            onClick={() => handleGoalSelect(goal.title)}
            className={`cursor-pointer border-2 border-lightGray2 py-8 px-6 rounded-lg text-left transition-colors ${selectedGoals.includes(goal.title)
              ? "bg-primaryBlue text-white"
              : "border-gray-300 hover:bg-primaryBlue hover:text-white"
              }`}
          >
            <h3 className="text-lg mb-1.5">{goal.title}</h3>
            <p className="text-sm opacity-80">{goal.description}</p>
          </div>
        ))}
      </div>

      <NavigationButtons
        nextStep={handleNext}
        previousStep={previousStep}
        isNextDisabled={selectedGoals.length < 3}
      />
    </div>
  );
};

export default Panel02;
