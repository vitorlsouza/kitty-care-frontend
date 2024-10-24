import React from "react";

interface Panel03Props {
  previousStep: () => void;
  nextStep: () => void;
}

const Panel03: React.FC<Panel03Props> = ({ previousStep, nextStep }) => {
  return (
    <div className="p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-semibold mb-4">Panel 03</h1>
      <div className="flex space-x-4">
        <button
          onClick={previousStep}
          className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
        >
          Back
        </button>
        <button
          onClick={nextStep}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Panel03;
