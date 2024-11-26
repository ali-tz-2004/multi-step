import { useEffect, useState } from "react";
import Stepper from "./Stepper";
import { steps } from "../data/StepperData";
import store from "storejs";
import useStoreState from "../hooks/useStoreState";

export const Card = () => {
  const [currentStep, setCurrentStep] = useStoreState("currentStep", 0);
  const [isFadingCard, setIsFadingCard] = useState(false);
  const [direction, setDirection] = useState<"next" | "prev">("next");

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setDirection("next");
      setIsFadingCard(true);
      setCurrentStep((prev) => prev + 1);
      setTimeout(() => {
        setIsFadingCard(false);
      }, 500);
    }
  };

  const prevStep = () => {
    setDirection("prev");
    if (currentStep > 0) {
      setIsFadingCard(true);
      setCurrentStep((prev) => prev - 1);
      setTimeout(() => {
        setIsFadingCard(false);
      }, 500);
    }
  };

  const goToStep = (index: number) => {
    setCurrentStep(index);
  };

  useEffect(() => {
    const step = store.get("step");
    if (step > 1) return;
    store.set("step", 1);
  }, []);

  useEffect(() => {
    const currentSte = store.get("currentStep") as number | undefined;
    setCurrentStep(currentSte ?? 0);
  }, [setCurrentStep]);

  return (
    <div>
      <Stepper
        steps={steps}
        currentStep={currentStep}
        isFadingCard={isFadingCard}
        nextStep={nextStep}
        prevStep={prevStep}
        goToStep={goToStep}
      />
    </div>
  );
};
