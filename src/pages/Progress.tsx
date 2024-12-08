import { useState, useMemo } from 'react';
import * as Panels from '../components/Panels';
import ProgressBar from '../components/ProgressBar';
import Layout from '../components/Layout';

// Constants
const MAX_STEPS = 15;
const MIN_STEP = 2;

const Progress = () => {
  // Initialize state based on localStorage
  const catId = localStorage.getItem('catId');
  const [currentStep, setCurrentStep] = useState(catId ? MAX_STEPS : MIN_STEP);

  // Navigation handlers
  const nextStep = () => {
    setCurrentStep((prevStep) => {
      const nextStep = prevStep + 1;
      // Skip step 14
      return nextStep === 14 ? 15 : Math.min(nextStep, MAX_STEPS);
    });
  };

  const previousStep = () => {
    setCurrentStep((prevStep) => {
      const newPrevStep = prevStep - 1;
      // Skip step 14
      return newPrevStep === 14 ? 13 : Math.max(newPrevStep, MIN_STEP);
    });
  };

  // Memoized panel mapping to prevent recreation on each render
  const panelMap = useMemo(() => ({
    1: <Panels.Panel01 nextStep={nextStep} />,
    2: <Panels.Panel02 nextStep={nextStep} previousStep={previousStep} />,
    3: <Panels.Panel03 nextStep={nextStep} previousStep={previousStep} />,
    4: <Panels.Panel04 nextStep={nextStep} previousStep={previousStep} />,
    5: <Panels.Panel05 nextStep={nextStep} previousStep={previousStep} />,
    6: <Panels.Panel06 nextStep={nextStep} previousStep={previousStep} />,
    7: <Panels.Panel07 nextStep={nextStep} previousStep={previousStep} />,
    8: <Panels.Panel08 nextStep={nextStep} previousStep={previousStep} />,
    9: <Panels.Panel09 nextStep={nextStep} previousStep={previousStep} />,
    10: <Panels.Panel10 nextStep={nextStep} previousStep={previousStep} />,
    11: <Panels.Panel11 nextStep={nextStep} previousStep={previousStep} />,
    12: <Panels.Panel12 nextStep={nextStep} previousStep={previousStep} />,
    13: <Panels.Panel13 nextStep={nextStep} previousStep={previousStep} />,
    // 14: <Panels.Panel14 nextStep={nextStep} previousStep={previousStep} />,
    15: <Panels.Panel14 previousStep={previousStep} />,
    // 15: <Panels.Panel15 previousStep={previousStep} />,
  }), []);

  // Render current panel based on step
  const renderPanel = () => {
    return panelMap[currentStep as keyof typeof panelMap] || panelMap[1];
  };

  return (
    <Layout>
      <div className="w-full text-center flex justify-center items-center">
        <ProgressBar
          className="w-full flex items-center justify-center"
          currentStep={currentStep}
        />
      </div>
      <div className="flex-grow flex items-center justify-center w-full">
        {renderPanel()}
      </div>
    </Layout>
  );
};

export default Progress;
