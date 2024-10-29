import React, { useEffect } from "react";
import { useRive, UseRiveParameters } from "@rive-app/react-canvas";

interface PawAnimationProps {
  className?: string;
}

const PawAnimation: React.FC<PawAnimationProps> = ({ className }) => {
  const riveParams: UseRiveParameters = {
    src: "/assets/riv-files/Pawprints_kitty.riv", 
    stateMachines: "State Machine 1",
    autoplay: true, 
  };

  const { RiveComponent, rive } = useRive(riveParams);

  useEffect(() => {
    if (rive) {
      rive.play(); 
    }
  }, [rive]);

  return RiveComponent ? (
    <RiveComponent className={className} />
  ) : (
    <p>Loading animation...</p> 
  );
};

export default PawAnimation;
