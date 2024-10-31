import React, { useEffect, useRef } from "react";
import { useRive, useStateMachineInput } from "@rive-app/react-canvas";

interface ProgressBarProps {
  className?: string;
  currentStep: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  className,
  currentStep,
}) => {
  const progress = useRef(0);

  const riveParams = {
    src: "/assets/riv-files/loadingbarkitty_v4.riv",
    stateMachines: "State Machine 1",
    autoplay: true,
  };

  const { RiveComponent, rive } = useRive(riveParams);
  const progressInput = useStateMachineInput(
    rive,
    "State Machine 1",
    "Progress"
  );

  useEffect(() => {
    if (progressInput) {
      progressInput.value = currentStep;
      progress.current = currentStep;

      if (rive) {
        rive.play();
      }
    }
  }, [currentStep, progressInput, rive]);

  return (
    <div className={className}>
      <div className="w-full rive-container md:w-[750px] h-20 md:h-[28]">
        {RiveComponent ? <RiveComponent /> : <p>Loading animation...</p>}
      </div>
    </div>
  );
};

export default ProgressBar;
