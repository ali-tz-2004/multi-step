import axios from "axios";
import { IdTitleType } from "../types/IdTitleType";

export const getLanguages = async () => {
  const response = await axios.get<IdTitleType[]>("/data/Language.json");
  return response ?? [];
};
