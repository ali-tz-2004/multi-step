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
  priceMonth: string;
  priceYear: string;
}
