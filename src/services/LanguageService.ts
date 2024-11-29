import axios from "axios";
import { IdTitleType } from "../types/IdTitleType";
import { LanguageType } from "../types/LanguageType";

export const getLanguages = async () => {
  const response = await axios.get<IdTitleType<LanguageType>[]>(
    "/data/Language.json"
  );
  return response ?? [];
};
