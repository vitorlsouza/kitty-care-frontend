import React, { useEffect, useState, useCallback } from "react";
import { useRive, useStateMachineInput } from "@rive-app/react-canvas";
import { motion, AnimatePresence } from "framer-motion";
import NavigationButtons from "../NavigationButtons";
import {
  PANEL_DATA,
  ANIMATION_INTERVAL,
  RIVE_ANIMATION_VALUE,
  PanelDescription
} from "./constants/panel03Data";

interface Panel03Props {
  previousStep: () => void;
  nextStep: () => void;
}

const Panel03: React.FC<Panel03Props> = ({ previousStep, nextStep }) => {
  const [currentDescription, setCurrentDescription] = useState<number>(0);
  const [isRiveLoaded, setIsRiveLoaded] = useState<boolean>(false);

  // Initialize Rive animation
  const { rive, RiveComponent } = useRive({
    src: "/assets/riv-files/graph_kitty_V5.riv",
    stateMachines: "State Machine 1",
    autoplay: true,
    onLoad: () => setIsRiveLoaded(true),
  });

  const riveInput = useStateMachineInput(rive, "State Machine 1", "Number 1");

  // Handle description rotation
  const rotateDescription = useCallback(() => {
    setCurrentDescription((prev) =>
      prev === PANEL_DATA.length - 1 ? 0 : prev + 1
    );
  }, []);

  // Set up animation interval
  useEffect(() => {
    const interval = setInterval(rotateDescription, ANIMATION_INTERVAL);
    return () => clearInterval(interval);
  }, [rotateDescription]);

  // Initialize Rive input
  useEffect(() => {
    if (riveInput) {
      riveInput.value = RIVE_ANIMATION_VALUE;
    }
  }, [riveInput]);

  return (
    <div className="w-full md:max-w-[1380px] p-6 rounded-md mx-auto">
      <DescriptionSection currentDescription={PANEL_DATA[currentDescription]} />
      <AnimationSection
        RiveComponent={RiveComponent}
        isLoaded={isRiveLoaded}
      />
      <NavigationButtons
        nextStep={nextStep}
        previousStep={previousStep}
        isNextDisabled={false}
      />
    </div>
  );
};

interface DescriptionSectionProps {
  currentDescription: PanelDescription;
}

const DescriptionSection: React.FC<DescriptionSectionProps> = ({ currentDescription }) => (
  <div className="h-[224px] md:h-36 flex items-center justify-center md:mx-24 md:px-8 relative">
    <AnimatePresence mode="wait">
      <motion.div
        key={currentDescription.id}
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -10 }}
        transition={{ duration: 0.5 }}
        className="absolute w-full text-center"
      >
        <h2 className="text-2xl font-semibold">
          {currentDescription.title}
        </h2>
        <p className="text-md max-w-2xl mx-auto mt-4 text-darkGray">
          {currentDescription.description}
        </p>
      </motion.div>
    </AnimatePresence>
  </div>
);

interface AnimationSectionProps {
  RiveComponent: React.ComponentType<any>;
  isLoaded: boolean;
}

const AnimationSection: React.FC<AnimationSectionProps> = ({ RiveComponent, isLoaded }) => (
  <div className="flex flex-col justify-center items-center">
    {!isLoaded && <div className="p-10 text-center m-auto w-full">Loading animation...</div>}
    <RiveComponent style={{ width: "845px", height: "280px" }} />
  </div>
);

export default Panel03;
