import React, { useState } from "react";
import { StepType } from "../types/StepType";
import store from "storejs";
import { IconTick } from "../assets/icons/IconTIck";

interface IStepperProps {
  steps: StepType[];
  currentStep: number;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (index: number) => void;
}

const Stepper: React.FC<IStepperProps> = ({
  steps,
  currentStep,
  nextStep,
  prevStep,
  goToStep,
}) => {
  const stepIndex = store.get("step") as number;
  const [isFading, setIsFading] = useState(false);

  const currentStepHandler = (index: number) => {
    if (index < stepIndex && stepIndex <= 4) {
      setIsFading(true);
      setTimeout(() => {
        goToStep(index);
        setIsFading(false);
      }, 500);
    }
  };

  return (
    <div className="w-full flex flex-col md:flex-row md:w-50 rounded-xl shadow-md md:p-3 md:h-30 relative md:static md:bg-card bg-background">
      <div className="bg-bottom flex justify-center md:flex-col md:justify-start md:bg-slider-desktop bg-slider-mobile bg-no-repeat bg-cover md:p-6 md:w-1/3 overflow-hidden md:rounded-xl pb-28 md:pb-0">
        {steps
          .filter((x) => x.visible)
          .map((step, index) => (
            <div key={index} className="text-center flex items-center p-4">
              <div
                className={`w-8 h-8 rounded-full text-white transition-all duration-500 ${
                  index === currentStep
                    ? "bg-blue-600 animate-fadeIn"
                    : isFading && index === currentStep
                    ? "animate-fadeOut"
                    : "border"
                } flex items-center justify-center text-xs font-bold ${
                  index < stepIndex ? "cursor-pointer bg-green-500" : ""
                } `}
                onClick={() => currentStepHandler(index)}
              >
                {index < stepIndex - 1 ? <IconTick /> : index + 1}
              </div>
              <div className="flex flex-col md:pr-4 text-start">
                <span className="text-white font-semibold text-xs hidden md:block">
                  {step.description}
                </span>
              </div>
            </div>
          ))}
      </div>

      <div className="md:m-0 top-20 w-full md:w-2/3 p-4 md:p-8 md:px-20 absolute md:static">
        <div className="rounded-md md:mb-4 bg-card p-5 md:p-0 md:relative h-full">
          {React.cloneElement(
            steps[currentStep].children as React.ReactElement,
            {
              nextStep,
              prevStep,
            }
          )}
        </div>
      </div>
    </div>
  );
};

export default Stepper;
