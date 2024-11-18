import axios from "axios";
import { AddOnsType } from "../types/AddOnsType";

export const getAddOnsEn = async () => {
  const response = await axios.get<AddOnsType[]>("/data/Add-ons-en.json");
  return response ?? [];
};

export const getAddOnsFa = async () => {
  const response = await axios.get<AddOnsType[]>("/data/Add-ons-fa.json");
  return response ?? [];
};
