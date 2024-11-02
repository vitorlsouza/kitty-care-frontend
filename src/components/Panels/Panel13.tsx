import React, { useEffect, useRef } from "react";
import PawAnimation from "../PawPrintAnimation";
import NavigationButtons from "../NavigationButtons";
import { createCatAsync } from "../../Redux/features/catsSlice";
import { useAppDispatch } from "../../Redux/hooks";

interface Panel13Props {
  nextStep: () => void;
  previousStep: () => void;
}

const Panel13: React.FC<Panel13Props> = ({ nextStep, previousStep }) => {
  const dispatch = useAppDispatch();
  const hasDispatchedRef = useRef(false);

  useEffect(() => {
    if (hasDispatchedRef.current) return;
    hasDispatchedRef.current = true;

    const goals = localStorage.getItem("goals");
    const issues_faced = localStorage.getItem("issues_faced");
    const activity_level = localStorage.getItem("activity_level");
    const gender = localStorage.getItem("gender");
    const age = parseInt(localStorage.getItem("age") || "0");
    const country = localStorage.getItem("country");
    const zipcode = localStorage.getItem("zipcode");
    const breed = localStorage.getItem("breed");
    const weight = parseFloat(localStorage.getItem("weight") || "0");
    const target_weight = parseFloat(localStorage.getItem("target_weight") || "0");
    const required_progress = localStorage.getItem("required_progress");
    const check_in_period = localStorage.getItem("check_in_period");
    const training_days = localStorage.getItem("training_days");
    const medical_conditions = localStorage.getItem("medical_conditions");
    const medications = localStorage.getItem("medications");
    const dietary_restrictions = localStorage.getItem("dietary_restrictions");
    const medical_history = localStorage.getItem("medical_history");
    const items = localStorage.getItem("items");

    dispatch(
      createCatAsync({
        goals,
        issues_faced,
        activity_level,
        gender,
        age,
        country,
        zipcode,
        breed,
        weight,
        target_weight,
        required_progress,
        check_in_period,
        training_days,
        medical_conditions,
        medications,
        dietary_restrictions,
        medical_history,
        items,
      })
    );

    setTimeout(() => {
      nextStep();
    }, 3000);
  }, [dispatch, nextStep]);

  return (
    <div className="w-full max-w-md lg:max-w-4xl mx-auto p-4 lg:p-6 font-inter">
      <div className="text-center mb-8">
        <h1 className="font-bold text-xl lg:text-3xl mb-2">
          We’re Creating Your Cat’s Personal Plan!
        </h1>
        <p className="text-sm lg:text-md text-darkGray max-w-2xl mx-auto">
          Based on your selections, we’re crafting a customized care and
          training plan just for your cat. This will only take a moment!
        </p>
      </div>

      <PawAnimation className="flex items-center justify-center w-72 h-72 lg:w-full mx-16" />

      <div className="text-center mt-4">
        <p className="font-semibold text-md lg:text-lg text-darkGray">
          Fetching the best advice for your cat...
        </p>
        <p className="text-sm text-gray-500">This will take a few seconds</p>
      </div>

      <div className="bg-lightPearl text-mediumGray text-center rounded-2xl py-4 px-6 lg:px-10 mt-6 mx-4 lg:mx-auto max-w-md lg:max-w-lg border-pearlBush">
        <p className="text-xs md:text-sm font-normal">
          We’re getting everything ready! Soon, you’ll have a personalized plan
          that fits your cat’s needs and lifestyle.
        </p>
      </div>

      <NavigationButtons
        nextStep={nextStep}
        previousStep={previousStep}
        isNextDisabled={true}
      />
    </div>
  );
};

export default Panel13;
