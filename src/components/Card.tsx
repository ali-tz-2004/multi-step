import { useEffect, useState } from "react";
import Stepper from "./Stepper";
import { steps } from "../data/StepperData";
import store from "storejs";

export const Card = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const goToStep = (index: number) => {
    setCurrentStep(index);
  };

  useEffect(() => {
    store.set("step", 1);
  }, []);

  return (
    <Stepper
      steps={steps}
      currentStep={currentStep}
      nextStep={nextStep}
      prevStep={prevStep}
      goToStep={goToStep}
    />
  );
};
