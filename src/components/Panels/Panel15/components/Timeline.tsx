import React from "react";
import Tip from "../../Tip";

interface TimelineItem {
  method: string;
  description: string;
}

const timelineItems: TimelineItem[] = [
  { method: "Method 1", description: "Introduce healthier feeding habits" },
  { method: "Method 2", description: "Notice a reduction in scratching" },
  { method: "Method 4", description: "Improved playtime activity" },
  { method: "Method 6", description: "Weight loss goal reached" },
];

const Timeline: React.FC = () => {
  return (
    <div className="w-full max-w-lg p-6 rounded-lg mx-auto font-inter">
      <h2 className="text-[20px] font-semibold text-center mb-4">
        Timeline Overview
      </h2>

      <div className="flex flex-col items-center bg-lightPearl px-8 py-4 border-2 border-pearlBush rounded-3xl">
        <div className="bg-lightGray rounded-xl px-4 py-2 text-center mb-6">
          <h1 className="font-inter text-[20px] font-semibold text-black leading-[28px]">
            Next 6 Months
          </h1>
        </div>

        <div className="grid grid-cols-3 gap-3 items-center">
          {/* Left side with Method labels */}
          <div className="flex flex-col items-center justify-between space-y-10 h-full">
            {timelineItems.map((item, index) => (
              <div key={index} className="font-semibold text-black">
                {item.method}
              </div>
            ))}
          </div>

          {/* Center Vertical Progress Bar */}
          <div className="flex flex-col items-center justify-between space-y-10 h-full">
            <img
              src="/assets/VerticalProgress.png"
              alt="Vertical Progress"
              className="w-8 h-[25rem]"
            />
          </div>

          {/* Right side with Descriptions */}
          <div className="flex flex-col items-center justify-between space-y-10 h-full">
            {timelineItems.map((item, index) => (
              <div key={index} className="text-gray-600 text-sm font-medium">
                {item.description}
              </div>
            ))}
          </div>
        </div>
      </div>

      <Tip text="Staying consistent will help you and your cat reach these milestones!" />
    </div>
  );
};

export default Timeline;
