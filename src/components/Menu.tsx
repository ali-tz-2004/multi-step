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
import { IconLanguage } from "../assets/icons/IconLanguage";

export const Menu = () => {
  const [isDarkTheme, setIsDarkTheme] = useStoreState("isDarkTheme", false);
  const [isMenu, setIsMenu] = useState(false);

  const [language, setLanguage] = useStoreState<IdTitleType>("language", {
    id: 1,
    title: "en",
  });
  const [languages, setLanguages] = useState<IdTitleType[]>([]);
  const [widthMenu, setWidthMenu] = useState("w-0");

  const { t, i18n } = useTranslation();

  const menuHandler = () => {
    if (isMenu) {
      setWidthMenu("w-0");

      setTimeout(() => {
        setIsMenu(false);
      }, 500);
    } else {
      setWidthMenu("w-62");
      setIsMenu(true);
    }
  };

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
  }, [setIsDarkTheme]);

  useEffect(() => {
    const storedLanguage = store.get("language") as IdTitleType | undefined;
    if (storedLanguage) {
      setLanguage(storedLanguage);
    } else {
      setLanguage({ id: 1, title: "en" });
    }
  }, [setLanguage]);

  useEffect(() => {
    if (languages.length > 0) {
      const defaultLang =
        i18n.language === "en"
          ? languages.find((x) => x.id === 1)
          : languages.find((x) => x.id === 2);

      if (defaultLang) setLanguage(defaultLang);
    }
  }, [i18n.language, languages, setLanguage]);

  return (
    <div className="z-10 h-full">
      <div
        className={`absolute top-0 ${
          language.id === 1 ? "left-0" : "right-0"
        } md:m-10 m-4 cursor-pointer`}
        onClick={menuHandler}
      >
        <IconMenuBar />
      </div>
      <div
        className={`h-full bg-card fixed cursor-pointer menu shadow-md ${
          language.id === 1 ? "left-0" : "right-0"
        } ${widthMenu}`}
      >
        {isMenu && (
          <div className="mx-2 my-14 p-3">
            <div
              className={`absolute top-0 m-3 ${
                language.id === 1 ? "right-0" : "left-0"
              }`}
              onClick={menuHandler}
            >
              <IconClose />
            </div>
            <div className="rounded-lg bg-background w-full p-3 shadow-md">
              <label className="block text-sm font-medium pb-3">
                {t("tm")}:
              </label>

              <ToggleButton
                isToggled={isDarkTheme}
                onToggle={toggleHandle}
                label1={t("DarkTheme")}
                label2={t("LightTheme")}
              />
            </div>
            <div className="rounded-lg w-full bg-background p-3 my-5 shadow-md">
              <ComboBox
                label={<IconLanguage />}
                onSelect={languageHandler}
                defaultValue={language}
                options={languages}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
