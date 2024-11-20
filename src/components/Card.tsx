import { useEffect, useState } from "react";
import Stepper from "./Stepper";
import { steps } from "../data/StepperData";
import store from "storejs";
import useStoreState from "../hooks/useStoreState";

export const Card = () => {
  const [currentStep, setCurrentStep] = useStoreState("currentStep", 0);

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
    const step = store.get("step");
    if (step > 1) return;
    store.set("step", 1);

    const currentSte = store.get("currentStep") as number;
    setCurrentStep(currentSte ?? 0);
  }, []);

  return (
    <>
      <Stepper
        steps={steps}
        currentStep={currentStep}
        nextStep={nextStep}
        prevStep={prevStep}
        goToStep={goToStep}
      />
    </>
  );
};
