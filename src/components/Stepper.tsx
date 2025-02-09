import React, { useState } from "react";
import { StepType } from "../types/StepType";
import store from "storejs";
import { IconTick } from "../assets/icons/IconTIck";
import { useTranslation } from "react-i18next";

interface IStepperProps {
  steps: StepType[];
  currentStep: number;
  isFadingCard: boolean;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (index: number) => void;
}

const Stepper: React.FC<IStepperProps> = ({
  steps,
  currentStep,
  isFadingCard,
  nextStep,
  prevStep,
  goToStep,
}) => {
  const stepIndex = store.get("step") as number;
  const [isFading, setIsFading] = useState(false);
  const { t } = useTranslation();

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
    <div className="w-full flex flex-col md:flex-row md:w-50 rounded-xl shadow-md md:p-3 md:h-30 md:static md:bg-card bg-background absolute top-0 left-0">
      <div className="bg-bottom flex justify-center md:flex-col md:justify-start md:bg-slider-desktop bg-slider-mobile bg-no-repeat bg-cover md:p-6 md:w-1/3 md:rounded-xl pb-28 md:pb-0 w-full relative md:static transition">
        {steps
          .filter((x) => x.visible)
          .map((step) => (
            <div key={step.index} className="flex items-center p-4">
              <div
                className={`w-8 h-8 rounded-full text-white ${
                  step.index === currentStep
                    ? "bg-blue-600"
                    : step.index < stepIndex
                    ? "bg-green-500 cursor-pointer"
                    : "border"
                } flex items-center justify-center text-xs font-bold`}
                onClick={() => currentStepHandler(step.index)}
              >
                <div
                  className={`opacity-0${
                    (isFading || isFadingCard) && step.index === currentStep
                      ? ""
                      : "animate-fadeIn"
                  }`}
                >
                  {step.index < stepIndex - 1 ? <IconTick /> : step.index + 1}
                </div>
              </div>

              <div className="flex flex-col md:px-4">
                <span className="text-white font-semibold text-xs hidden md:block">
                  {t(step.description)}
                </span>
              </div>
            </div>
          ))}
      </div>

      <div className="top-20 md:w-2/3 p-4 md:p-8 md:px-20 absolute md:static w-full">
        <div
          className={`rounded-md md:mb-4 bg-card p-5 md:p-0 md:relative h-full opacity-0 ${
            isFading || isFadingCard ? "" : "animate-fadeIn"
          }`}
        >
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
