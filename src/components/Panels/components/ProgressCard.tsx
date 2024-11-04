import React from 'react';
import { ProgressItem } from '../constants/progressItems';

interface ProgressCardProps {
    item: ProgressItem;
    isSelected: boolean;
    onSelect: (id: number) => void;
}

export const ProgressCard: React.FC<ProgressCardProps> = ({
    item,
    isSelected,
    onSelect,
}) => {
    return (
        <button
            onClick={() => onSelect(item.id)}
            className={`w-full text-left border-2 flex items-center justify-start h-24 md:h-20 px-4 sm:px-8 md:px-4 md:py-3 lg:py-5 rounded-2xl transition-all duration-300 ${isSelected ? "bg-primaryBlue text-white" : "border-gray-300"
                }`}
            aria-pressed={isSelected}
        >
            <div>
                <h3
                    className={`text-md font-semibold ${isSelected ? "text-white" : "text-black"
                        }`}
                >
                    {item.title}
                </h3>
                <p
                    className={`text-xs ${isSelected ? "text-white" : "text-darkGray"
                        }`}
                >
                    {item.description}
                </p>
            </div>
        </button>
    );
}; 