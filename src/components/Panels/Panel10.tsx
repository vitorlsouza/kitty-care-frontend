import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import NavigationButtons from "../NavigationButtons";

interface Panel10Props {
  nextStep: () => void;
  previousStep: () => void;
}

const Panel10: React.FC<Panel10Props> = ({ nextStep, previousStep }) => {
  const [selectedDays, setSelectedDays] = useState<string[]>([]);

  const days = [
    { id: 1, day: "Any Day" },
    { id: 2, day: "Monday" },
    { id: 3, day: "Tuesday" },
    { id: 4, day: "Wednesday" },
    { id: 5, day: "Thursday" },
    { id: 6, day: "Friday" },
    { id: 7, day: "Saturday" },
    { id: 8, day: "Sunday" },
  ];

  useEffect(() => {
    const storedDays = localStorage.getItem("training_days");
    if (storedDays) {
      setSelectedDays(storedDays.split(","));
    }
  }, []);

  const handleDaySelect = (day: string) => {
    setSelectedDays((prevSelectedDays) => {
      const newSelectedDays = prevSelectedDays.includes(day)
        ? prevSelectedDays.filter((selectedDay) => selectedDay !== day)
        : [...prevSelectedDays, day];

      localStorage.setItem("training_days", newSelectedDays.join(","));
      return newSelectedDays;
    });
  };

  const handleSubmit = () => {
    if (selectedDays.length > 0) {
      localStorage.setItem("training_days", selectedDays.join(","));
      nextStep();
    }
  };

  return (
    <div className="w-full md:max-w-[1380px] p-6 rounded-md mx-auto">
      <div className="text-center mb-6 lg:mb-8">
        <h1 className="font-bold text-xl mb-2 mx-8 md:mx-40 lg:mx-80">
          Pick Your Best Training Days
        </h1>
        <p className="text-sm text-darkGray px-8 md:mx-36 lg:mx-72">
          Select the days when you’re most likely to dedicate time to training
          your cat. We recommend picking at least 2-3 days a week for best
          results.
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-2 md:gap-2 mx-4 md:mx-32 lg:mx-60">
        {days.map((day) => (
          <motion.div
            key={day.id}
            onClick={() => handleDaySelect(day.day)}
            className={`cursor-pointer border-2 p-4 lg:p-6 rounded-2xl text-left transition-all duration-300 ${
              selectedDays.includes(day.day)
                ? "border-primaryBlue"
                : "border-lightGray2"
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex justify-between items-center">
              <h3
                className={`text-md lg:text-lg font-semibold ${
                  selectedDays.includes(day.day)
                    ? "text-primaryBlue"
                    : "text-black"
                }`}
              >
                {day.day}
              </h3>
              <div
                className={`ml-4 lg:ml-auto w-6 h-6 lg:w-6 lg:h-6 rounded-full border-2 flex justify-center items-center ${
                  selectedDays.includes(day.day)
                    ? "border-primaryBlue"
                    : "border-lightGray2"
                }`}
              >
                {selectedDays.includes(day.day) && (
                  <span className="w-2 h-2 lg:w-3 lg:h-3 rounded-full bg-primaryYellow"></span>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <NavigationButtons
        nextStep={handleSubmit}
        previousStep={previousStep}
        isNextDisabled={selectedDays.length === 0}
      />
    </div>
  );
};

export default Panel10;
