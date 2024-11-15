import axios from "axios";
import { AddOnsType } from "../types/AddOnsType";

export const getAddOns = async () => {
  const response = await axios.get<AddOnsType[]>("/data/Add-ons.json");
  return response;
};
