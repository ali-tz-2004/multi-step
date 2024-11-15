import { AddOns } from "../components/steps/AddOns";
import { FinalResult } from "../components/steps/FinalResult";
import { PersonalInfo } from "../components/steps/PersonalInfo";
import { SelectPlan } from "../components/steps/SelectPlane";
import { Summary } from "../components/steps/Summary";
import { StepType } from "../types/StepType";

export const steps: StepType[] = [
  {
    index: 1,
    title: "مرحله 1",
    description: "درباره شما",
    children: <PersonalInfo />,
    visible: true,
  },
  {
    index: 2,
    title: "مرحله 2",
    description: "انتخاب برنامه ریزی",
    children: <SelectPlan />,
    visible: true,
  },
  {
    index: 3,
    title: "مرحله 3",
    description: "افزودنی ها",
    children: <AddOns />,
    visible: true,
  },
  {
    index: 4,
    title: "مرحله 4",
    description: "خلاصه",
    children: <Summary />,
    visible: true,
  },
  {
    index: 5,
    title: "مرحله 5",
    description: "پایان",
    children: <FinalResult />,
    visible: false,
  },
];
