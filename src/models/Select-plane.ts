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
