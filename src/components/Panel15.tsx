import React from "react";

interface Panel15Props {
  previousStep: () => void;
}

const Panel15: React.FC<Panel15Props> = ({ previousStep }) => {
  return (
    <div className="p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-semibold mb-4">Panel 15</h1>
      <div className="flex space-x-4">
        <button
          onClick={previousStep}
          className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
        >
          Back
        </button>

      </div>
    </div>
  );
};

export default Panel15;
