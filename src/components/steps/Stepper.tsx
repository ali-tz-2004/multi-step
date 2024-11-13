import React from "react";
import { IStepperProps } from "../../utils/Stepper-utils";

const Stepper: React.FC<IStepperProps> = ({
  steps,
  currentStep,
  nextStep,
  prevStep,
}) => {
  const CurrentStepComponent = steps[currentStep].children;

  return (
    <div className="w-full flex flex-col md:flex-row md:w-50 bg-white rounded-xl shadow-md md:p-3 md:h-30 relative md:static">
      <div className="bg-bottom flex justify-center md:flex-col md:justify-start md:bg-slider-desktop bg-slider-mobile bg-no-repeat bg-cover md:p-6 md:w-1/3 overflow-hidden md:rounded-xl pb-28 md:pb-0">
        {steps.map((step, index) => (
          <div key={index} className="text-center flex items-center p-4 ">
            <div
              className={`w-8 h-8 rounded-full ${
                index === currentStep
                  ? "text-black bg-blue-300"
                  : "border text-white"
              } flex items-center justify-center`}
            >
              {index + 1}
            </div>
            <div className="flex flex-col md:pr-4 text-start">
              <span className="text-white opacity-50 text-xs hidden md:block">
                {step.title}
              </span>
              <span className="text-white font-semibold text-xs hidden md:block">
                {step.description}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="md:m-0 top-20 w-full md:w-2/3 p-4 md:p-8 md:px-20 absolute md:static">
        <div className="rounded-md md:mb-4 bg-white p-5 md:p-0 md:relative h-full">
          {React.cloneElement(CurrentStepComponent as React.ReactElement, {
            nextStep,
            prevStep,
          })}
        </div>
      </div>
    </div>
  );
};

export default Stepper;
