import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import NavigationButtons from "../NavigationButtons";

interface Panel08Props {
  nextStep: () => void;
  previousStep: () => void;
}

const Panel08: React.FC<Panel08Props> = ({ nextStep, previousStep }) => {
  const [selectedProgress, setSelectedProgress] = useState<number | null>(null);

  const progressItems = [
    {
      id: 1,
      title: "Weight Loss",
      description: "Help my cat achieve a healthier weight.",
      popupTitle: "Great Choice!",
      popupDescription:
        "Helping your cat lose weight will improve their overall health, increase their energy, and may extend their life expectancy.",
    },
    {
      id: 2,
      title: "Socialization",
      description:
        "Improve my cat's comfort and interactions with other pets or people.",
      popupTitle: "Perfect!",
      popupDescription:
        "Improving your cat’s social skills will help them feel more comfortable around people, pets, and new environments.",
    },
    {
      id: 3,
      title: "Litter Box Use",
      description: "Ensure my cat consistently uses the litter box.",
      popupTitle: "Excellent Choice!",
      popupDescription:
        "Focusing on litter box habits can significantly reduce stress for both you and your cat, ensuring a cleaner, happier home.",
    },
    {
      id: 4,
      title: "Reduced Scratching",
      description:
        "Stop my cat from scratching furniture or other inappropriate surfaces.",
      popupTitle: "Great Pick!",
      popupDescription:
        "Focused progress on reducing scratching can improve your cat’s well-being and protect your furniture from damage.",
    },
    {
      id: 5,
      title: "Increased Playtime",
      description: "Encourage more active and engaging play for my cat.",
      popupTitle: "Fantastic!",
      popupDescription:
        "Increasing playtime will help your cat stay active, burn off energy, and improve both physical and mental health.",
    },
    {
      id: 6,
      title: "Reduced Anxiety",
      description:
        "Help my cat feel more relaxed and reduce stress or anxious behaviors.",
      popupTitle: "Smart Choice!",
      popupDescription:
        "Reducing anxiety can lead to a happier, calmer cat, and also help improve their behavior and response to changes in their environment.",
    },
  ];

  const handleCardSelect = (id: number) => {
    setSelectedProgress(id === selectedProgress ? null : id);
  };

  const handleSubmit = () => {
    if (selectedProgress !== null) {
      nextStep();
    }
  };

  const selectedPopup =
    selectedProgress !== null
      ? progressItems.find((item) => item.id === selectedProgress)
      : null;

  return (
    <div className="w-full max-w-2xl lg:max-w-6xl mx-auto p-6 relative">
      <div className="text-center mb-8">
        <h1 className="font-bold text-2xl lg:text-3xl mb-2">
          What Progress is Most Important To You?
        </h1>
        <p className="text-md text-darkGray max-w-2xl mx-auto">
          Choose the most important area where you'd like to see progress for
          your cat.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 lg:mx-12">
        {progressItems.map((item) => (
          <div
            key={item.id}
            onClick={() => handleCardSelect(item.id)}
            className={`cursor-pointer border-2 flex items-center justify-start h-24 md:h-20 px-4 sm:px-8 md:px-4 md:py-3 lg:py-5 rounded-2xl text-left transition-all duration-300 ${
              selectedProgress === item.id
                ? "bg-primaryBlue text-white"
                : "border-gray-300"
            }`}
          >
            <div className="">
              <h3
                className={`text-md font-semibold ${
                  selectedProgress === item.id ? "text-white" : "text-black"
                }`}
              >
                {item.title}
              </h3>
              <p
                className={`text-xs ${
                  selectedProgress === item.id ? "text-white" : "text-darkGray"
                }`}
              >
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      <AnimatePresence>
        {selectedPopup && (
          <motion.div
            key={selectedPopup.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.3 }}
            className="hidden md:flex absolute md:top-[-150px] md:right-[-20px] lg:top-[-280px] lg:right-[20px] bg-lightWhite mt-2 rounded-2xl md:w-64 lg:w-72 flex-col items-center border-2 border-pearlBush shadow-lg"
          >
            <h2 className="bg-primaryYellow text-black text-md font-semibold rounded-b-2xl px-4 py-1 mx-auto text-center">
              {selectedPopup.popupTitle}
            </h2>
            <p className="text-xs leading-relaxed text-center px-4 pb-2">
              {selectedPopup.popupDescription}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <NavigationButtons
        nextStep={nextStep}
        previousStep={previousStep}
        isNextDisabled={selectedProgress === null}
      />
    </div>
  );
};

export default Panel08;
