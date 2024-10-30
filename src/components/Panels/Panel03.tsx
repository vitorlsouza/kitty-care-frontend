import React, { useEffect, useState } from "react";
import { useRive, useStateMachineInput } from "@rive-app/react-canvas";
import { motion, AnimatePresence } from "framer-motion";

const data = [
  {
    id: 0,
    title: "We Understand, Cats Can Be Quite a Handful!",
    description:
      "Scratching the furniture? Ignoring commands? Feeling anxious? We know how challenging these behaviors can be, but don't worry! With some dedicated training and a little patience, you can help your cat feel more relaxed and stop damaging your home.",
  },
  {
    id: 1,
    title: "Let’s Get Your Cat Moving and Healthy!",
    description:
      "We get it, helping your cat shed those extra pounds and lead a more active, fulfilled life can be tough. But don’t worry – with increased playtime and some lifestyle improvements, your cat will be on the road to better health in no time!",
  },
  {
    id: 2,
    title: "We understand how stressful litter box issues can be!",
    description:
      "Dealing with a stressed cat and litter box problems can be overwhelming, but you’re not alone! With some adjustments, we can work on reducing your cat’s anxiety and creating better litter box habits that make life easier for both of you.",
  },
  {
    id: 3,
    title:
      "We know it’s tough when your cat is anxious around people or other pets!",
    description:
      "Socializing a cat can be tricky, especially if they’re anxious or untrained. But don’t worry, with the right approach, you’ll be able to help your cat feel more comfortable and respond to your training cues.",
  },
  {
    id: 4,
    title: "We know how frustrating scratching and lack of playtime can be!",
    description:
      "Scratching up your furniture and being less active than you'd like? We understand how hard it can be to keep your cat engaged. With some extra playtime and training, we can help reduce those destructive behaviors and bring more fun to your cat’s day.",
  },
];

interface Panel03Props {
  previousStep: () => void;
  nextStep: () => void;
}

const Panel03: React.FC<Panel03Props> = ({ previousStep, nextStep }) =>  {
  const [currentDescription, setCurrentDescription] = useState(0); 
  const { rive, RiveComponent } = useRive({
    src: "/assets/riv-files/Graph_kitty.riv",
    stateMachines: "State Machine 1",
    autoplay: true,
  });


  const riveInput = useStateMachineInput(rive, "State Machine 1", "Number 1");


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDescription((prev) =>
        prev === data.length - 1 ? 0 : prev + 1
      );
    }, 3000); 

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (riveInput) {
      riveInput.value = 1;
    }
  }, [riveInput]);

  return (
    <div className="w-full md:max-w-[1380px] p-6 rounded-md mx-auto">
          <div className="relative h-24 md:h-24 flex items-center justify-center mb-2"> 
        <AnimatePresence mode="wait"> 
          <motion.div
            key={currentDescription}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="absolute w-full text-center"
          >
            <h2 className="text-2xl font-semibold">{data[currentDescription].title}</h2>
            <p className="text-md max-w-2xl mx-auto mt-4 text-darkGray">
              {data[currentDescription].description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="flex justify-center">
        <RiveComponent style={{ width: "845px", height: "350px" }} />
      </div>
      <div className="flex justify-center items-center mt-6 space-x-4">
        <button
          onClick={previousStep}
          className="px-6 py-2 bg-transparent text-mediumGray border border-mediumGray rounded-full hover:text-white hover:border-none hover:bg-primaryBlue"
        >
          {"<"} Back
        </button>
        <button
          onClick={nextStep}
          className="px-8 py-2 rounded-full text-white bg-primaryBlue hover:bg-primaryBlue"
        >
          Next {">"}
        </button>
      </div>
    </div>
  );
};

export default Panel03;
