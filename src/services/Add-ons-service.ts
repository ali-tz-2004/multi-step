import axios from "axios";
import { IAddOns } from "../models/Add-ons-model";

export const getAddOns = async () => {
  const response = await axios.get<IAddOns[]>("/data/Add-ons.json");
  return response;
};
