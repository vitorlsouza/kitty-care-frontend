import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";
import NavigationButtons from "../NavigationButtons";
import { PROGRESS_ITEMS } from "./constants/progressItems";
import { ProgressCard } from "./components/ProgressCard";
import { useNavigate } from "react-router-dom";

interface Panel08Props {
  nextStep: () => void;
  previousStep: () => void;
}

const Panel08: React.FC<Panel08Props> = ({ nextStep, previousStep }) => {
  const [selectedProgress, setSelectedProgress] = useState<number | null>(null);
  const navigate = useNavigate();

  // Load saved progress from localStorage
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/signup');
      return;
    };
  }, [])
  useEffect(() => {
    const storedProgress = localStorage.getItem("required_progress");
    if (storedProgress) {
      const foundItem = PROGRESS_ITEMS.find(
        (item) => item.title === storedProgress
      );
      if (foundItem) {
        setSelectedProgress(foundItem.id);
      }
    }
  }, []);

  const handleCardSelect = (id: number) => {
    const newProgress = id === selectedProgress ? null : id;
    setSelectedProgress(newProgress);

    const selectedItem = PROGRESS_ITEMS.find((item) => item.id === newProgress);
    if (selectedItem) {
      localStorage.setItem("required_progress", selectedItem.title);
    } else {
      localStorage.removeItem("required_progress");
    }
  };

  const handleSubmit = () => {
    if (selectedProgress !== null) {
      nextStep();
    }
  };

  const selectedPopup = selectedProgress !== null
    ? PROGRESS_ITEMS.find((item) => item.id === selectedProgress)
    : null;

  return (
    <main className="w-full max-w-2xl lg:max-w-6xl mx-auto p-6 relative">
      <header className="text-center mb-8">
        <h1 className="font-bold text-2xl lg:text-3xl mb-2">
          What Progress is Most Important To You?
        </h1>
        <p className="text-sm text-darkGray max-w-2xl mx-auto">
          Choose the most important area where you'd like to see progress for
          your cat.
        </p>
      </header>

      <section
        className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 lg:mx-12"
        role="radiogroup"
        aria-label="Progress options"
      >
        {PROGRESS_ITEMS.map((item) => (
          <ProgressCard
            key={item.id}
            item={item}
            isSelected={selectedProgress === item.id}
            onSelect={handleCardSelect}
          />
        ))}
      </section>

      <AnimatePresence>
        {selectedPopup && (
          <motion.aside
            key={selectedPopup.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.3 }}
            className="hidden md:flex absolute md:top-[-150px] md:right-[-20px] lg:top-[-150px] lg:right-0 bg-lightWhite mt-2 rounded-2xl md:w-64 lg:w-72 flex-col items-center border-2 border-pearlBush shadow-lg"
            role="complementary"
            aria-label="Selection feedback"
          >
            <h2 className="bg-primaryYellow text-black text-md font-semibold rounded-b-2xl px-4 py-1 mx-auto text-center">
              {selectedPopup.popupTitle}
            </h2>
            <p className="text-xs leading-relaxed text-center px-4 pb-2">
              {selectedPopup.popupDescription}
            </p>
          </motion.aside>
        )}
      </AnimatePresence>

      <NavigationButtons
        nextStep={handleSubmit}
        previousStep={previousStep}
        isNextDisabled={selectedProgress === null}
      />
    </main>
  );
};

export default Panel08;
