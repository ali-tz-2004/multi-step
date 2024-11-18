import { useEffect, useState } from "react";
import ToggleButton from "./Toggle-button";
import store from "storejs";
import useStoreState from "../hooks/useStoreState";
import { IconMenuBar } from "../assets/icons/IconMenuBar";
import { IconClose } from "../assets/icons/IconClose";
import ComboBox from "./ComboBox";
import { IdTitleType } from "../types/IdTitleType";
import { getLanguages } from "../services/LanguageService";
import { AxiosError } from "axios";
import { useTranslation } from "react-i18next";

export const Menu = () => {
  const [isDarkThem, setIsDarkThem] = useStoreState("isDarkThem", false);
  const [isMenu, setIsMenu] = useState(false);

  const menuHandler = () => setIsMenu(!isMenu);

  const { t, i18n } = useTranslation();

  const addClassToBody = (nextIsDarkThem: boolean) => {
    if (nextIsDarkThem) {
      document.body.classList.remove("light");
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
      document.body.classList.add("light");
    }
  };

  const toggleHandle = () => {
    const nextIsDarkThem = !isDarkThem;
    setIsDarkThem(nextIsDarkThem);
    addClassToBody(nextIsDarkThem);
  };

  const languageHandler = (language: IdTitleType) => {
    let newLang = "";
    if (language.id == 1) newLang = "en";
    else if (language.id == 2) newLang = "fa";
    i18n.changeLanguage(newLang);
  };

  const [languages, setLanguages] = useState<IdTitleType[]>([]);

  const loadLanguages = async () => {
    try {
      const result = await getLanguages();
      setLanguages(result.data);
    } catch (e) {
      const error = e as AxiosError;
      console.error("Error fetching languages data:", error);
      setLanguages([]);
    }
  };

  useEffect(() => {
    loadLanguages();
    const them = store.get("isDarkThem") as boolean;
    setIsDarkThem(them);
    addClassToBody(them);
  }, []);

  const [language, setLanguage] = useState<IdTitleType>();
  useEffect(() => {
    if (i18n.language == "en") setLanguage(languages.find((x) => x.id == 1));
    else if (i18n.language == "fa")
      setLanguage(languages.find((x) => x.id == 2));
  }, [i18n.language, languages]);

  return (
    <div className="z-10 h-full">
      <div
        className="absolute top-0 right-0 md:m-10 m-4 cursor-pointer"
        onClick={menuHandler}
      >
        <IconMenuBar />
      </div>
      {isMenu ? (
        <div className="h-full bg-card md:w-56 w-40 fixed right-0 cursor-pointer">
          <div className="absolute left-0 top-0 m-3" onClick={menuHandler}>
            <IconClose />
          </div>
          <div className="absolute md:top-10 md:right-0 md:p-5 md:mt-0 p-1 mt-14 z-10 bg-card rounded-lg">
            <ToggleButton
              isToggled={isDarkThem}
              onToggle={toggleHandle}
              label1={t("DarkTheme")}
              label2={t("LightTheme")}
            ></ToggleButton>
          </div>
          <div className="absolute md:top-24 md:right-0 md:p-5 md:mt-0 p-1 mt-14 z-10 bg-card rounded-lg">
            <ComboBox
              label={`${t("Language")}`}
              onSelect={(language) => languageHandler(language)}
              defaultValue={language}
              options={languages}
            />
          </div>
          {/* <div className="absolute md:top-24 md:right-0 md:p-5 md:mt-0 p-1 mt-14 z-10 bg-card rounded-lg">
            <LanguageSwitcher />
          </div> */}
        </div>
      ) : null}
    </div>
  );
};
