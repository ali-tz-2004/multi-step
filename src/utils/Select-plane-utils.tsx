import { IconAdvanced } from "../assets/icons/Icon-advanced";
import { IconArcade } from "../assets/icons/Icon-arcade";
import { IconPro } from "../assets/icons/Icon-pro";

export interface ISelectPlanProps {
  nextStep?: () => void;
  prevStep?: () => void;
}

export interface IPlanCards {
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

export enum PlaneType {
  monthly = 1,
  yearly = 2,
}

export interface IToggleButton {
  isToggled: PlaneType;
  onToggle: () => void;
  label1?: string;
  label2?: string;
}

export const planCards: IPlanCards[] = [
  {
    id: 1,
    idTag: "plane-1",
    icon: <IconArcade />,
    title: "آرکید",
    month: "10 ت / ماهانه",
    year: "100 ت / سالانه",
    messageFree: "2 ماه رایگان",
    value: "arcade",
    moneyMonth: 10,
    moneyYear: 100,
  },
  {
    id: 2,
    idTag: "plane-2",
    icon: <IconAdvanced />,
    title: "پیشرفته",
    month: "20 ت / ماهانه",
    year: "200 ت / سالانه",
    messageFree: "2 ماه رایگان",
    value: "advance",
    moneyMonth: 20,
    moneyYear: 200,
  },
  {
    id: 3,
    idTag: "plane-3",
    icon: <IconPro />,
    title: "حرفه ای",
    month: "40 ت / ماهانه",
    year: "400 ت / سالانه",
    messageFree: "2 ماه رایگان",
    value: "pro",
    moneyMonth: 40,
    moneyYear: 400,
  },
];
