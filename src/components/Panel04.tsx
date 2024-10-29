import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const data = [
  {
    id: 0,
    title: "What’s Standing in Your Way?",
    description:
      "Select all the barriers that may be making it difficult to reach your cat’s goals.",
  },
  {
    id: 1,
    title: "We understand, life gets busy!",
    description:
      "Finding time to care for your cat between a busy schedule and an inconsistent routine can be tough, especially when you're unsure of the best steps to take. But don't worry, we're here to help! Together, we'll create a manageable routine with simple, effective tips to improve your cat’s health and happiness.",
  },
  {
    id: 2,
    title: "We know cats can be stubborn!",
    description:
      "It’s not easy when your cat resists change, and a stressful environment can make it even harder. We get that staying motivated is challenging when results are slow, but you’re not alone. We’ll work with you to find ways to reduce your cat's stress and keep them on the right track.",
  },
  {
    id: 3,
    title: "We know health issues can make things difficult",
    description:
      "Managing your cat’s health can feel overwhelming, especially when paired with financial concerns and uncertainty about the right steps to take. We're here to provide affordable solutions and helpful advice to guide you through, even when things get tough.",
  },
  {
    id: 4,
    title: "We get it, routines can be hard to stick to",
    description:
      "Sticking to a consistent routine is tricky when life gets in the way, especially with a cat that’s resistant to change. And staying motivated is tough when progress seems slow. We’re here to help you find a routine that works for you and your cat, with tips to make training easier and more enjoyable.",
  },
  {
    id: 5,
    title: "We understand, stress can affect everyone!",
    description:
      "A stressful environment can impact both you and your cat, making it hard to know what to do next. When you’re low on time and knowledge, it can feel overwhelming. We’ll help you create a calmer space for your cat and provide simple, actionable tips that fit into your schedule.",
  },
];

const goals = [
  {
    title: "Time Constraints",
    description:
      "I don’t have enough time to consistently train or play with my cat.",
  },
  {
    title: "Lack of Knowledge",
    description:
      "I’m not sure what steps to take or how to address my cat’s behaviors.",
  },
  {
    title: "Inconsistent Routine",
    description:
      "I struggle to stick to a regular schedule for feeding, play, or training.",
  },
  {
    title: "Cat's Stubburn Behavior",
    description: "My cat is resistant to change or ignores training efforts.",
  },
  {
    title: "Stressful Environment",
    description:
      "There are things in my home that make my cat anxious (e.g., other pets, loud noises).",
  },
  {
    title: "Health Issues",
    description:
      "My cat has health conditions (e.g., weight issues, anxiety) that make it harder to reach our goals.",
  },
  {
    title: "Financial Constraints",
    description:
      "I’m limited by the cost of toys, special food, or vet visits.",
  },
  {
    title: "Lack of Motivation",
    description: "I struggle to stay motivated or keep track of progress.",
  },
];

const slideVariant = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 100 },
};

interface Panel04Props {
  nextStep: () => void;
  previousStep: () => void;
}

const Panel04: React.FC<Panel04Props> = ({ nextStep, previousStep }) => {
  const [currentDescription, setCurrentDescription] = useState(0);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDescription((prev) =>
        prev === data.length - 1 ? 0 : prev + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

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
      <div className="relative h-auto flex flex-col items-center justify-center mb-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentDescription}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="w-full text-center"
          >
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2">
              {data[currentDescription].title}
            </h2>
            <p className="text-sm sm:text-md md:text-lg max-w-lg mx-auto mt-2 text-darkGray leading-relaxed">
              {data[currentDescription].description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6 w-3/4 mx-auto">
        {goals.map((goal) => (
          <div
            key={goal.title}
            onClick={() => handleGoalSelect(goal.title)}
            className={`cursor-pointer border-2 border-lightGray2 p-4 rounded-lg text-center transition-colors w-full ${
              selectedGoals.includes(goal.title)
                ? "bg-primaryBlue text-white"
                : "hover:bg-primaryBlue hover:text-white"
            }`}
          >
            <h3 className="text-md md:text-lg mb-1.5">{goal.title}</h3>
            <p className="text-xs sm:text-sm opacity-80 leading-snug">
              {goal.description}
            </p>
          </div>
        ))}
      </div>
      

      <div className="flex flex-col sm:flex-row justify-center items-center mt-6 space-y-4 sm:space-y-0 sm:space-x-4">
        <button
          onClick={previousStep}
          className="px-4 sm:px-6 py-2 bg-transparent text-mediumGray border border-mediumGray rounded-full hover:text-white hover:bg-primaryBlue"
        >
          {"<"} Back
        </button>
        <button
          onClick={nextStep}
          disabled={selectedGoals.length !== 3}
          className={`px-6 py-2 rounded-full text-white ${
            selectedGoals.length === 3
              ? "bg-primaryBlue"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          Next {">"}
        </button>
      </div>
    </div>
  );
};

export default Panel04;
