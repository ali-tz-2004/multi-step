import { useTranslation } from "react-i18next";

export interface TfootStepperProps {
  prevStep?: () => void;
  step?: 1 | 2 | 3 | 4;
}

export const StepFooter = ({ prevStep, step }: TfootStepperProps) => {
  const { t, i18n } = useTranslation();

  return (
    <div
      className={`fixed md:absolute ${
        i18n.language === "fa" ? "left-0" : "right-0"
      } bg-card w-full p-4 bottom-0 md:p-0 ${
        step === 1 ? "text-end" : "flex justify-between"
      }`}
    >
      <button
        type="button"
        className={`px-4 py-2 text-light-gray rounded-md text-sm hover:text-foreground hover:font-bold ${
          step === 1 ? "hidden" : ""
        }`}
        onClick={prevStep}
      >
        {t("GoBack")}
      </button>
      <button
        type="submit"
        className="bg-btn-next-step px-4 py-2 text-white rounded-md text-sm hover:bg-btn-next-step-hover"
      >
        {`${step === 4 ? t("Confirm") : t("NextStep")}`}
      </button>
    </div>
  );
};
