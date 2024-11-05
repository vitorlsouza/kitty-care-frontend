import React, { useState, useEffect } from "react";
import NavigationButtons from "../NavigationButtons";
import ActivityCard from "./components/ActivityCard";
import { ACTIVITY_LEVELS, STORAGE_KEY } from "./constants/panel05Data";

interface Panel05Props {
  nextStep: () => void;
  previousStep: () => void;
}

const Panel05: React.FC<Panel05Props> = ({ nextStep, previousStep }) => {
  const [selectedActivity, setSelectedActivity] = useState<number | null>(null);

  // Load saved activity level from localStorage
  useEffect(() => {
    const storedActivity = localStorage.getItem(STORAGE_KEY);
    if (storedActivity) {
      const activityId = ACTIVITY_LEVELS.find(
        (level) => level.title === storedActivity
      )?.id;
      setSelectedActivity(activityId ?? null);
    }
  }, []);

  // Save selected activity level to localStorage
  useEffect(() => {
    if (selectedActivity !== null) {
      const selectedLevel = ACTIVITY_LEVELS.find(
        (level) => level.id === selectedActivity
      );
      if (selectedLevel) {
        localStorage.setItem(STORAGE_KEY, selectedLevel.title);
      }
    }
  }, [selectedActivity]);

  return (
    <div className="w-full p-6 rounded-md mx-auto font-Inter">
      <div className="text-center mb-6">
        <h1 className="font-bold text-2xl md:text-3xl mb-2">
          What's Your Cat's Activity Level?
        </h1>
        <p className="text-sm text-darkGray mx-8 md:mx-36 text-center px-4">
          Select the option that best describes your cat's typical energy and
          activity level.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 lg:max-w-[1450px] mx-8 md:mx-12 lg:mx-36">
        {ACTIVITY_LEVELS.map((level) => (
          <ActivityCard
            key={level.id}
            level={level}
            isSelected={selectedActivity === level.id}
            onClick={() => setSelectedActivity(level.id)}
          />
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
