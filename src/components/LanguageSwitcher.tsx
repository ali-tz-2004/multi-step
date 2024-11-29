import React from "react";
import { useTranslation } from "react-i18next";
import { Language_EN, Language_FA } from "../constants/Languages";

export const LanguageSwitcher: React.FC = () => {
  const { i18n, t } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === Language_EN ? Language_FA : Language_EN;
    i18n.changeLanguage(newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
    >
      {t("switch_to_farsi")}
    </button>
  );
};
