import React, { useState } from "react";

interface Panel12Props {
  nextStep: () => void;
  previousStep: () => void;
}

interface CatItem {
  id: number;
  title: string;
  description: string;
  icon: string; // Icon path or component name
}

const catItems: CatItem[] = [
  {
    id: 1,
    title: "Litter Box",
    description: "Stay on top of your cat’s health and progress every day.",
    icon: "/assets/LitterBox.png",
  },
  {
    id: 2,
    title: "Scratching Post or Pad",
    description: "To help reduce unwanted scratching behavior.",
    icon: "/assets/ScratchingPost.png",
  },
  {
    id: 3,
    title: "Cat Toys",
    description: "For playtime and mental stimulation.",
    icon: "/assets/CatToys.png",
  },
  {
    id: 4,
    title: "Treats",
    description: "For rewarding good behavior or training.",
    icon: "/assets/Treats.png",
  },
  {
    id: 5,
    title: "Dry Food",
    description: "For playtime and mental stimulation.",
    icon: "/assets/DryFood.png",
  },
  {
    id: 6,
    title: "Wet Food",
    description: "Canned or pouches of wet food for variety in diet.",
    icon: "/assets/WetFoods.png",
  },
  {
    id: 7,
    title: "Cat Carrier",
    description: "For trips to the vet or travel.",
    icon: "/assets/CatCarrier.png",
  },
  {
    id: 8,
    title: "Grooming Supplies",
    description: "To help maintain your cat’s coat and nails.",
    icon: "/assets/GroomingSupplies.png",
  },
  {
    id: 9,
    title: "Flea Prevention or Other Health Products",
    description: "Items like flea collars, drops, or supplements.",
    icon: "/assets/FleaPrevention.png",
  },
];

const Panel12: React.FC<Panel12Props> = ({ nextStep, previousStep }) => {
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const handleItemClick = (id: number) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  return (
    <div className="w-full max-w-lg lg:max-w-5xl mx-auto p-4 lg:p-6 relative font-inter">
      {/* Header */}
      <div className="text-center mb-6 lg:mb-8">
        <h1 className="font-bold text-xl mb-2">What Cat Items Do You Own?</h1>
        <p className="text-sm lg:text-md text-darkGray max-w-2xl mx-auto">
          Let us know what cat-related items you have at home so we can tailor
          our tips and recommendations.
        </p>
      </div>

      {/* Cat Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 lg:mx-24">
        {catItems.map((item) => (
          <div
            key={item.id}
            onClick={() => handleItemClick(item.id)}
            className={`flex items-start cursor-pointer border-2 p-4 lg:p-5 rounded-2xl transition-all duration-300 ${
              selectedItems.includes(item.id)
                ? "border-primaryBlue bg-lightBlue"
                : "border-lightGray2"
            }`}
          >
            {/* Icon */}
            <div className="w-12 h-12 bg-primaryBlue flex items-center justify-center rounded-lg mr-4">
              <img src={item.icon} alt={`${item.title} icon`} className="w-12 h-12" />
            </div>
            {/* Text Content */}
            <div className="flex-1">
              <h3 className="text-md font-semibold mb-1">{item.title}</h3>
              <p className="text-sm text-darkGray">{item.description}</p>
            </div>
            {/* Radio Button */}
            <div
              className={`ml-4 mt-1 w-6 h-6 lg:w-6 lg:h-6 rounded-full border-2 flex-shrink-0 flex justify-center items-center ${
                selectedItems.includes(item.id)
                  ? "border-primaryBlue"
                  : "border-lightGray2"
              }`}
            >
              {selectedItems.includes(item.id) && (
                <span className="w-3 h-3 lg:w-3 lg:h-3 rounded-full bg-primaryBlue"></span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-center items-center mt-8 space-x-4">
        <button
          onClick={previousStep}
          className="px-6 py-2 bg-transparent text-mediumGray border border-mediumGray rounded-full hover:text-white hover:border-none hover:bg-primaryBlue"
        >
          {"<"} Back
        </button>
        <button
          onClick={nextStep}
          className={`px-8 py-2 rounded-full text-white ${
            selectedItems.length > 0
              ? "bg-primaryBlue hover:bg-primaryBlue"
              : "bg-gray-300 cursor-not-allowed"
          }`}
          disabled={selectedItems.length === 0} // Disable button if no items are selected
        >
          Submit My Cat Items
        </button>
      </div>
    </div>
  );
};

export default Panel12;
