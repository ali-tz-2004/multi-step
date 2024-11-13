export enum AddOnId {
  OnlineService = "online-service",
  LargeStorage = "large-storage",
  CustomProfile = "custom-profile",
}

export interface IAddOns {
  id: number;
  name: AddOnId;
  label: string;
  description: string;
  month: string;
  year: string;
  moneyMonth: number;
  moneyYear: number;
}
