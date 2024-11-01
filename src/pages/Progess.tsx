import { useState } from "react";

import Panel01 from "../components/Panels/Panel01";
import Panel02 from "../components/Panels/Panel02";
import Panel03 from "../components/Panels/Panel03";
import Panel04 from "../components/Panels/Panel04";
import Panel05 from "../components/Panels/Panel05";
import Panel06 from "../components/Panels/Panel06";
import Panel07 from "../components/Panels/Panel07";
import Panel08 from "../components/Panels/Panel08";
import Panel09 from "../components/Panels/Panel09";
import Panel10 from "../components/Panels/Panel10";
import Panel11 from "../components/Panels/Panel11";
import Panel12 from "../components/Panels/Panel12";
import Panel13 from "../components/Panels/Panel13";
import Panel14 from "../components/Panels/Panel14";
import Panel15 from "../components/Panels/Panel15";
import ProgressBar from "../components/ProgressBar";

const Progress = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () => {
    setCurrentStep((prevStep) => Math.min(prevStep + 1, 15));
  };

  const previousStep = () => {
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 1));
  };

  const renderPanel = () => {
    switch (currentStep) {
      case 1:
        return <Panel01 nextStep={nextStep} />;
      case 2:
        return <Panel02 nextStep={nextStep} previousStep={previousStep} />;
      case 3:
        return <Panel03 nextStep={nextStep} previousStep={previousStep} />;
      case 4:
        return <Panel04 nextStep={nextStep} previousStep={previousStep} />;
      case 5:
        return <Panel05 nextStep={nextStep} previousStep={previousStep} />;
      case 6:
        return <Panel06 nextStep={nextStep} previousStep={previousStep} />;
      case 7:
        return <Panel07 nextStep={nextStep} previousStep={previousStep} />;
      case 8:
        return <Panel08 nextStep={nextStep} previousStep={previousStep} />;
      case 9:
        return <Panel09 nextStep={nextStep} previousStep={previousStep} />;
      case 10:
        return <Panel10 nextStep={nextStep} previousStep={previousStep} />;
      case 11:
        return <Panel11 nextStep={nextStep} previousStep={previousStep} />;
      case 12:
        return <Panel12 nextStep={nextStep} previousStep={previousStep} />;
      case 13:
        return <Panel13 nextStep={nextStep} previousStep={previousStep} />;
      case 14:
        return <Panel14 nextStep={nextStep} previousStep={previousStep} />;
      case 15:
        return <Panel15 previousStep={previousStep} />;

      default:
        return <Panel01 nextStep={nextStep} />;
    }
  };

  return (
    <>
      <div className="w-full text-center flex justify-center items-center">
        <ProgressBar
          className="w-full flex items-center justify-center"
          currentStep={currentStep}
        />
      </div>
      <div className="flex-grow flex items-center justify-center w-full">
        {renderPanel()}
      </div>
    </>
  );
};

export default Progress;
