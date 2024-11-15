import { AddOns } from "../components/steps/Add-ons";
import { PersonalInfo } from "../components/steps/Personal-info";
import { SelectPlan } from "../components/steps/Select-plane";
import { Summary } from "../components/steps/Summary";
import { StepType } from "../types/StepType";

export const steps: StepType[] = [
  { title: "مرحله 1", description: "درباره شما", children: <PersonalInfo /> },
  {
    title: "مرحله 2",
    description: "انتخاب برنامه ریزی",
    children: <SelectPlan />,
  },
  { title: "مرحله 3", description: "افزودنی ها", children: <AddOns /> },
  { title: "مرحله 4", description: "خلاصه", children: <Summary /> },
];
