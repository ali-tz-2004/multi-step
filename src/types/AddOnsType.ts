export enum AddOnsName {
  OnlineService = "online-service",
  LargeStorage = "large-storage",
  CustomProfile = "custom-profile",
}

export interface AddOnsType {
  id: number;
  name: AddOnsName;
  label: string;
  description: string;
  month: string;
  year: string;
  moneyMonth: number;
  moneyYear: number;
}
