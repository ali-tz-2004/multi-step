import { AddOns } from "../components/steps/AddOns";
import { FinalResult } from "../components/steps/FinalResult";
import { PersonalInfo } from "../components/steps/PersonalInfo";
import { SelectPlan } from "../components/steps/SelectPlane";
import { Summary } from "../components/steps/Summary";
import { StepType } from "../types/StepType";

export const steps: StepType[] = [
  {
    index: 1,
    title: "Step1",
    description: "YouInfoStepper",
    children: <PersonalInfo />,
    visible: true,
  },
  {
    index: 2,
    title: "Step2",
    description: "SelectPlaneStepper",
    children: <SelectPlan />,
    visible: true,
  },
  {
    index: 3,
    title: "Step3",
    description: "AddOnsStepper",
    children: <AddOns />,
    visible: true,
  },
  {
    index: 4,
    title: "Step4",
    description: "SummaryStepper",
    children: <Summary />,
    visible: true,
  },
  {
    index: 5,
    title: "Step5",
    description: "Final",
    children: <FinalResult />,
    visible: false,
  },
];
