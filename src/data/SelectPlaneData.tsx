import { IconAdvanced } from "../assets/icons/IconAdvanced";
import { IconArcade } from "../assets/icons/IconArcade";
import { IconPro } from "../assets/icons/IconPro";

export interface PlanCards {
  id: number;
  idTag: string;
  icon: React.ReactNode;
  title: string;
  month: string;
  year: string;
  messageFree?: string;
  value: string;
  moneyMonth: string;
  moneyYear: string;
}

export const planCards: PlanCards[] = [
  {
    id: 1,
    idTag: "plane-1",
    icon: <IconArcade />,
    title: "SelectYourPlanArcade",
    month: "SelectYourPlanArcadeMonth",
    year: "SelectYourPlanArcadeYear",
    messageFree: "SelectYourPlanArcadeYearMessage",
    value: "arcade",
    moneyMonth: "SelectYourPlanArcadeMoneyMonth",
    moneyYear: "SelectYourPlanArcadeMoneyYear",
  },
  {
    id: 2,
    idTag: "plane-2",
    icon: <IconAdvanced />,
    title: "SelectYourPlanAdvanced",
    month: "SelectYourPlanAdvancedMonth",
    year: "SelectYourPlanAdvancedYear",
    messageFree: "SelectYourPlanAdvancedYearMessage",
    value: "advance",
    moneyMonth: "SelectYourPlanAdvancedMoneyMonth",
    moneyYear: "SelectYourPlanAdvancedMoneyYear",
  },
  {
    id: 3,
    idTag: "plane-3",
    icon: <IconPro />,
    title: "SelectYourPlanPro",
    month: "SelectYourPlanProMonth",
    year: "SelectYourPlanProYear",
    messageFree: "SelectYourPlanProYearMessage",
    value: "pro",
    moneyMonth: "SelectYourPlanProMoneyMonth",
    moneyYear: "SelectYourPlanProMoneyYear",
  },
];
