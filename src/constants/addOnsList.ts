import { AddOnId, IAddOns } from "../models/AddOns";

export const addOnsList: IAddOns[] = [
  {
    id: 1,
    name: AddOnId.OnlineService,
    label: "سرویس آنلاین",
    description: "دسترسی به بازی های چند نفره",
    month: "+10 ت",
    year: "+100 ت",
    moneyMonth: 10,
    moneyYear: 100,
  },
  {
    id: 2,
    name: AddOnId.LargeStorage,
    label: "فضای ذخیره سازی بیشتر",
    description: "1 ترابایت فضای اضافی",
    month: "+20 ت",
    year: "+200 ت",
    moneyMonth: 20,
    moneyYear: 200,
  },
  {
    id: 3,
    name: AddOnId.CustomProfile,
    label: "پروفایل سفارشی",
    description: "تم های سفارشی برای پروفایل",
    month: "+20 ت",
    year: "+200 ت",
    moneyMonth: 20,
    moneyYear: 200,
  },
];
