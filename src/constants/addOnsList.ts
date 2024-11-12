import { AddOnId, IAddOns } from "../models/addOns";

export const addOnsList: IAddOns[] = [
  {
    id: 1,
    name: AddOnId.OnlineService,
    label: "سرویس آنلاین",
    description: "دسترسی به بازی های چند نفره",
    priceMonth: "+10 ت",
    priceYear: "+100 ت",
  },
  {
    id: 2,
    name: AddOnId.LargeStorage,
    label: "فضای ذخیره سازی بیشتر",
    description: "1 ترابایت فضای اضافی",
    priceMonth: "+20 ت",
    priceYear: "+200 ت",
  },
  {
    id: 3,
    name: AddOnId.CustomProfile,
    label: "پروفایل سفارشی",
    description: "تم های سفارشی برای پروفایل",
    priceMonth: "+20 ت",
    priceYear: "+200 ت",
  },
];
