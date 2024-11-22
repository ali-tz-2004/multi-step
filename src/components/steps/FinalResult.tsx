import { IconThankYou } from "../../assets/icons/IconThankYou";
import store from "storejs";
import { useTranslation } from "react-i18next";

interface FinalResultProps {
  prevStep?: () => void;
}

export const FinalResult = ({ prevStep }: FinalResultProps) => {
  const { t } = useTranslation();

  const stepBackHandler = (stepsBack: number) => {
    for (let i = 0; i < stepsBack; i++) {
      if (prevStep) {
        prevStep();
      }
    }
  };

  const againHandler = () => {
    if (prevStep) {
      stepBackHandler(4);
    }

    clearAll();
  };

  const clearAll = () => {
    store.remove("checkedItems");
    store.remove("currentStep");
    store.remove("email");
    store.remove("name");
    store.remove("phone");
    store.remove("planeId");
    store.set("step", 1);
  };

  return (
    <div className="flex justify-center items-center flex-col h-full py-10 md:py-0">
      <IconThankYou />
      <h2 className="text-2xl font-bold pt-8">{`${t("ThankYou")}`}</h2>
      <p className="text-sm text-center text-light-gray mb-4">
        {`${t("FinalMessage")}`}
      </p>
      <button
        onClick={againHandler}
        className="bg-btn-next-step px-4 py-2 text-white rounded-md text-sm hover:bg-btn-next-step-hover"
      >
        {t("Again")}
      </button>
    </div>
  );
};
