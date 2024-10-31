import React, { useState } from "react";
import NavigationButtons from "../NavigationButtons";

interface Panel05Props {
  nextStep: () => void;
  previousStep: () => void;
}

const activityLevels = [
  {
    id: 1,
    title: "Very Active",
    description:
      "My cat is always on the move, running, jumping, and playing throughout the day.",
    image: "/assets/veryActive.png",
  },
  {
    id: 2,
    title: "Active",
    description:
      "My cat has regular bursts of energy and enjoys playing several times a day.",
    image: "/assets/Active.png",
  },
  {
    id: 3,
    title: "Moderately Active",
    description:
      "My cat plays occasionally and likes to explore but also spends a lot of time resting.",
    image: "/assets/moderatelyActive.png",
  },
  {
    id: 4,
    title: "Mostly Inactive",
    description: "My cat prefers lounging around and only plays occasionally.",
    image: "/assets/mostlyInactive.png",
  },
  {
    id: 5,
    title: "Very Inactive",
    description:
      "My cat rarely engages in play or activity and spends most of the time sleeping or resting.",
    image: "/assets/veryInactive.png",
  },
];

const Panel05: React.FC<Panel05Props> = ({ nextStep, previousStep }) => {
  const [selectedActivity, setSelectedActivity] = useState<number | null>(null);

  return (
    <div className="w-full p-6 rounded-md mx-auto font-Inter">
      <div className="text-center mb-6">
        <h1 className="font-bold text-3xl lg:text-xl mb-2">
          What's Your Cat’s Activity Level?
        </h1>
        <p className="text-md lg:text-darkGray mx-8 md:mx-36 text-center px-4">
          Select the option that best describes your cat’s typical energy and
          activity level.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 lg:max-w-[1450px] mx-8 md:mx-12 lg:mx-36">
        {activityLevels.map((level) => (
          <div
            key={level.id}
            onClick={() => setSelectedActivity(level.id)}
            className={`cursor-pointer flex items-start p-2 sm:p-4 w-full space-x-4 border-2 rounded-2xl transition-colors ${
              selectedActivity === level.id
                ? "bg-primaryBlue text-white border-primaryBlue"
                : "border-gray-300 bg-white"
            }`}
          >
            <img
              src={level.image}
              alt={level.title}
              className="w-20 h-20 md:w-24 md:h-24"
            />
            <div className="flex flex-col justify-center">
              <h3
                className={`font-medium ${
                  selectedActivity === level.id ? "text-white" : "text-black"
                } lg:text-xl text-base`}
              >
                {level.title}
              </h3>
              <p
                className={`${
                  selectedActivity === level.id
                    ? "text-white opacity-80"
                    : "text-darkGray"
                } text-xs md:text-sm font-extralight`}
              >
                {level.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <NavigationButtons
        nextStep={nextStep}
        previousStep={previousStep}
        isNextDisabled={!selectedActivity}
      />
    </div>
  );
};

export default Panel05;
