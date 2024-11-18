import { IconAdvanced } from "../assets/icons/IconAdvanced";
import { IconArcade } from "../assets/icons/IconArcade";
import { IconPro } from "../assets/icons/IconPro";

interface IPlanCards {
  id: number;
  idTag: string;
  icon: React.ReactNode;
  title: string;
  month: string;
  year: string;
  messageFree?: string;
  value: string;
  moneyMonth: number;
  moneyYear: number;
}

export const planCards: IPlanCards[] = [
  {
    id: 1,
    idTag: "plane-1",
    icon: <IconArcade />,
    title: "SelectYourPlanArcade",
    month: "SelectYourPlanArcadeMoneyMonth",
    year: "SelectYourPlanArcadeMoneyYear",
    messageFree: "SelectYourPlanArcadeMoneyYearMessage",
    value: "arcade",
    moneyMonth: 10,
    moneyYear: 100,
  },
  {
    id: 2,
    idTag: "plane-2",
    icon: <IconAdvanced />,
    title: "SelectYourPlanAdvanced",
    month: "SelectYourPlanAdvancedMoneyMonth",
    year: "SelectYourPlanAdvancedMoneyYear",
    messageFree: "SelectYourPlanAdvancedMoneyYearMessage",
    value: "advance",
    moneyMonth: 20,
    moneyYear: 200,
  },
  {
    id: 3,
    idTag: "plane-3",
    icon: <IconPro />,
    title: "SelectYourPlanPro",
    month: "SelectYourPlanProMoneyMonth",
    year: "SelectYourPlanProMoneyYear",
    messageFree: "SelectYourPlanProMoneyYearMessage",
    value: "pro",
    moneyMonth: 40,
    moneyYear: 400,
  },
];
