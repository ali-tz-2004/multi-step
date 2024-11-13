export interface IFinalPlane {
  title: string;
  moneyText: string;
  money: number;
}

export interface ICheckedItem {
  title: string;
  moneyText: string;
  money: number;
}

export interface ISummaryProps {
  prevStep?: () => void;
}
