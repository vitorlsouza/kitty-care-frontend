import React, { useState } from "react";
import { TermsCheckbox } from "../Signup";

interface Panel08Props {
  previousStep: () => void;
  nextStep: () => void;
}

const Panel08: React.FC<Panel08Props> = ({ previousStep, nextStep }) => {
  const [checked, setChecked] = useState(false);

  return (
    <div className="w-full md:max-w-[540px] p-6 rounded-md mx-auto">
      <header className="text-center mb-8">
        <h1 className="font-bold text-2xl lg:text-3xl mb-2">
          Tell Us About You
        </h1>
        <p className="text-sm text-darkGray max-w-2xl mx-auto">
          Please provide some basic details about you so we can best help you.
        </p>
      </header>
      <div className="flex flex-col gap-6 w-full">
        <div className="flex gap-2">
          <input
            type='text'
            className='w-full border border-gray-300 px-4 py-2 rounded-full focus:border-primaryBlue focus:outline-none placeholder:text-sm'
            placeholder={'First name'} />
          <input
            type='text'
            className='w-full border border-gray-300 px-4 py-2 rounded-full focus:border-primaryBlue focus:outline-none placeholder:text-sm'
            placeholder={'Last name'} />
        </div>
        <div>
          <input
            type='email'
            className='w-full border border-gray-300 px-4 py-2 rounded-full focus:border-primaryBlue focus:outline-none placeholder:text-sm'
            placeholder={'Email'} />
        </div>
        <div className="px-2">
          <TermsCheckbox checked={checked} setChecked={setChecked} />
        </div>
      </div>

      <div className="flex flex-col-reverse gap-2 md:gap-4 mx-8 md:mx-0 md:flex-row justify-center items-center mt-6 space-y-4 md:space-y-0">
        <button
          onClick={previousStep}
          className="w-full h-[55px] md:w-[115px] md:h-[40px] rounded-2xl bg-transparent text-mediumGray border border-mediumGray hover:text-white hover:border-none hover:bg-primaryBlue"
          aria-label="Go to previous step"
        >
          <span aria-hidden="true">{"<"}</span> Back
        </button>

        <button
          onClick={nextStep}
          disabled
          className="w-full h-[55px] md:w-[115px] md:h-[40px] rounded-2xl bg-primaryBlue text-white hover:bg-opacity-90 disabled:bg-lightGray disabled:text-mediumGray disabled:cursor-not-allowed "
          aria-label="Go to next step"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Panel08;
