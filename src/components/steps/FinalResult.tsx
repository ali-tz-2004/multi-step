import { useEffect } from "react";
import { IconThankYou } from "../../assets/icons/IconThankYou";
import store from "storejs";
import { useTranslation } from "react-i18next";

export const FinalResult = () => {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    store.clear();
  }, []);

  return (
    <div className="flex justify-center items-center flex-col h-full py-10 md:py-0">
      <IconThankYou />
      <h2 className="text-2xl font-bold pt-8">{`${t("TankYou")}`}</h2>
      <p className="text-sm text-center text-light-gray">
        {`${t("FinalMessage")}`}
      </p>
    </div>
  );
};
