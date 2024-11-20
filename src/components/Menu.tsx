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
  const [isDarkTheme, setIsDarkTheme] = useStoreState("isDarkTheme", false);
  const [isMenu, setIsMenu] = useState(false);

  const [language, setLanguage] = useStoreState<IdTitleType>("language", {
    id: 1,
    title: "en",
  });
  const [languages, setLanguages] = useState<IdTitleType[]>([]);

  const { t, i18n } = useTranslation();

  const menuHandler = () => setIsMenu(!isMenu);

  const addClassToBody = (nextIsDarkTheme: boolean) => {
    document.body.classList.toggle("dark", nextIsDarkTheme);
    document.body.classList.toggle("light", !nextIsDarkTheme);
  };

  const toggleHandle = () => {
    const nextIsDarkTheme = !isDarkTheme;
    setIsDarkTheme(nextIsDarkTheme);
    addClassToBody(nextIsDarkTheme);
    store.set("isDarkTheme", nextIsDarkTheme);
  };

  const languageHandler = (selectedLanguage: IdTitleType) => {
    const newLang = selectedLanguage.id === 1 ? "en" : "fa";
    i18n.changeLanguage(newLang);
    setLanguage(selectedLanguage);
  };

  const loadLanguages = async () => {
    try {
      const result = await getLanguages();
      setLanguages(result.data || []);
    } catch (e) {
      console.error("Error fetching languages data:", e as AxiosError);
      setLanguages([]);
    }
  };

  useEffect(() => {
    loadLanguages();

    const storedTheme = store.get("isDarkTheme") as boolean | undefined;
    if (storedTheme) {
      setIsDarkTheme(storedTheme);
      addClassToBody(storedTheme);
    }

    const storedLanguage = store.get("language") as IdTitleType | undefined;
    if (storedLanguage) {
      setLanguage(storedLanguage);
    } else {
      setLanguage({ id: 1, title: "en" });
    }
  }, []);

  useEffect(() => {
    if (languages.length > 0) {
      const defaultLang =
        i18n.language === "en"
          ? languages.find((x) => x.id === 1)
          : languages.find((x) => x.id === 2);

      if (defaultLang) setLanguage(defaultLang);
    }
  }, [i18n.language, languages]);

  return (
    <div className="z-10 h-full">
      <div
        className="absolute top-0 right-0 md:m-10 m-4 cursor-pointer"
        onClick={menuHandler}
      >
        <IconMenuBar />
      </div>
      {isMenu && (
        <div className="h-full bg-card md:w-56 w-40 fixed right-0 cursor-pointer">
          <div className="absolute left-0 top-0 m-3" onClick={menuHandler}>
            <IconClose />
          </div>
          <div className="absolute md:top-10 md:right-0 md:p-5 md:mt-0 p-1 mt-14 z-10 bg-card rounded-lg">
            <ToggleButton
              isToggled={isDarkTheme}
              onToggle={toggleHandle}
              label1={t("DarkTheme")}
              label2={t("LightTheme")}
            />
          </div>
          <div className="absolute md:top-24 md:right-0 md:p-5 md:mt-0 p-1 mt-14 z-10 bg-card rounded-lg">
            <ComboBox
              label={`${t("Language")}`}
              onSelect={languageHandler}
              defaultValue={language}
              options={languages}
            />
          </div>
        </div>
      )}
    </div>
  );
};
