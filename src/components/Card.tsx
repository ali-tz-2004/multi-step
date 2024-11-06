import { useState } from "react";
import { IStep } from "../models/step";
import { AddOns } from "./steps/Add-ons";
import { PersonalInfo } from "./steps/Personal-info";
import { SelectPlan } from "./steps/Select-plane";
import Stepper from "./steps/Stepper";
import { Summary } from "./steps/Summary";

const steps: IStep[] = [
  { title: "مرحله 1", description: "درباره شما", children: <PersonalInfo /> },
  {
    title: "مرحله 2",
    description: "انتخاب برنامه ریزی",
    children: <SelectPlan />,
  },
  { title: "مرحله 3", description: "افزودنی ها", children: <AddOns /> },
  { title: "مرحله 4", description: "خلاصه", children: <Summary /> },
];

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

  return (
    <Stepper
      steps={steps}
      currentStep={currentStep}
      nextStep={nextStep}
      prevStep={prevStep}
    />
  );
};
