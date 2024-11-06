import React from "react";
import { IStep } from "../../models/step";

interface IStepperProps {
  steps: IStep[];
  currentStep: number;
  nextStep: () => void;
  prevStep: () => void;
}

const Stepper: React.FC<IStepperProps> = ({
  steps,
  currentStep,
  nextStep,
  prevStep,
}) => {
  const CurrentStepComponent = steps[currentStep].children;

  return (
    <div className="md:w-50 bg-white rounded-xl shadow-md p-3">
      <div className="w-full flex flex-col md:flex-row">
        <div className="bg-slider-desktop bg-no-repeat bg-cover md:p-6 md:w-1/3 md:overflow-hidden md:rounded-xl">
          {steps.map((step, index) => (
            <div key={index} className="text-center flex items-center p-4">
              <div
                className={`w-8 h-8 rounded-full ${
                  index === currentStep
                    ? "text-black bg-blue-300"
                    : "border text-white"
                } flex items-center justify-center`}
              >
                {index + 1}
              </div>
              <div className="flex flex-col pr-4 text-start">
                <span className="text-white opacity-50 text-xs">
                  {step.title}
                </span>
                <span className="text-white font-semibold text-xs">
                  {step.description}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="w-full md:w-2/3 p-6 md:p-8 md:px-20">
          <div className="text-center rounded-md mb-4">
            {React.cloneElement(CurrentStepComponent as React.ReactElement, {
              nextStep,
            })}
          </div>

          <div className="flex justify-between">
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              className={`px-4 py-2 text-white bg-gray-500 rounded-md disabled:bg-gray-300 ${
                currentStep === 0 ? "hidden" : ""
              }`}
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stepper;
