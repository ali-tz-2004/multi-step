import { IconAdvanced } from "../components/icons/Icon-advanced";
import { IconArcade } from "../components/icons/Icon-arcade";
import { IconPro } from "../components/icons/Icon-pro";

interface IPlanCards {
  id: number;
  idTag: string;
  icon: React.ReactNode;
  title: string;
  month: string;
  year: string;
  messageFree?: string;
  value: string;
}

export const planCards: IPlanCards[] = [
  {
    id: 1,
    idTag: "plane-1",
    icon: <IconArcade />,
    title: "آرکید",
    month: "10 ت / ماهانه",
    year: "100 ت / 1 ساله",
    messageFree: "2 ماه رایگان",
    value: "arcade",
  },
  {
    id: 2,
    idTag: "plane-2",
    icon: <IconAdvanced />,
    title: "پیشرفته",
    month: "20 ت / ماهانه",
    year: "200 ت / 1 ساله",
    messageFree: "2 ماه رایگان",
    value: "advance",
  },
  {
    id: 3,
    idTag: "plane-3",
    icon: <IconPro />,
    title: "حرفه ای",
    month: "40 ت / ماهانه",
    year: "400 ت / 1 ساله",
    messageFree: "2 ماه رایگان",
    value: "pro",
  },
];
