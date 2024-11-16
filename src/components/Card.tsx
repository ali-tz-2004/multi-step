import { useEffect, useState } from "react";
import Stepper from "./Stepper";
import { steps } from "../data/StepperData";
import store from "storejs";
import ToggleButton from "./Toggle-button";
import useStoreState from "../hooks/useStoreState";

export const Card = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isDarkThem, setIsDarkThem] = useStoreState("isDarkThem", false);

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

  const addClassToBody = (nextIsDarkThem: boolean) => {
    if (nextIsDarkThem) {
      document.body.classList.remove("light");
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
      document.body.classList.add("light");
    }
  };

  const toggleHandle = () => {
    const nextIsDarkThem = !isDarkThem;
    setIsDarkThem(nextIsDarkThem);
    addClassToBody(nextIsDarkThem);
  };

  useEffect(() => {
    const step = store.get("step");
    const them = store.get("isDarkThem") as boolean;
    setIsDarkThem(them);
    addClassToBody(them);
    if (step > 1) return;
    store.set("step", 1);
  }, []);

  return (
    <>
      <div className="absolute md:top-0 md:right-0 md:p-5 md:mt-0 p-1 mt-14 z-10 bg-card rounded-lg">
        <ToggleButton
          isToggled={isDarkThem}
          onToggle={toggleHandle}
          label1="سیاه"
          label2="سفید"
        ></ToggleButton>
      </div>
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
