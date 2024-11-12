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
