import { useEffect, useState } from "react";
import { StepFooter } from "./StepFooter";
import { Alert } from "../Alert";
import { AxiosError } from "axios";
import useStoreState from "../../hooks/useStoreState";
import store from "storejs";
import { PlaneType } from "../../types/PlaneType";
import { AddOnsType } from "../../types/AddOnsType";
import { getAddOnsEn, getAddOnsFa } from "../../services/AddOnsService";
import { useTranslation } from "react-i18next";
import { OrbitProgress } from "react-loading-indicators";
import { StepHeader } from "./StepHeader";
import { Language_FA } from "../../constants/Languages";

interface IAddOnsProps {
  nextStep?: () => void;
  prevStep?: () => void;
}

export const AddOns: React.FC<IAddOnsProps> = ({ nextStep, prevStep }) => {
  const planeType = store.get("planeType") as PlaneType;
  const [addOnsList, setAddOnsList] = useState<AddOnsType[]>([]);
  const [error, setError] = useState<string>();
  const [isLoading, setIsLoading] = useState(true);
  const [disableNextStep, setDisableNextStep] = useState(true);

  const [checkedItems, setCheckedItems] = useStoreState<number[]>(
    "checkedItems",
    []
  );

  const { t, i18n } = useTranslation();

  const handleCheckboxChange = (addOn: number) => {
    setCheckedItems((prev) => {
      const exists = prev.find((item) => item === addOn);
      return exists ? prev.filter((item) => item !== addOn) : [...prev, addOn];
    });
  };

  const handleSubmit = () => {
    if (nextStep) {
      nextStep();
      const step = store.get("step");
      if (step > 4) return;
      store.set("step", 4);
    }
  };

  useEffect(() => {
    const storedItems = store.get("checkedItems") as number[] | undefined;
    if (storedItems) {
      setCheckedItems(storedItems);
    }
  }, [setCheckedItems]);

  useEffect(() => {
    const fetchAddOns = async () => {
      setTimeout(async () => {
        try {
          const result =
            i18n.language === Language_FA
              ? await getAddOnsFa()
              : await getAddOnsEn();
          setAddOnsList(result.data);
          setIsLoading(false);
          setDisableNextStep(false);
          setError("");
        } catch (e) {
          const error = e as AxiosError;
          console.error("Error fetching add-ons data:", error);
          setError(error.message);
          setIsLoading(false);
          setAddOnsList([]);
          setDisableNextStep(false);
        }
      }, 700);
    };

    fetchAddOns();
  }, [i18n.language]);

  return (
    <div>
      <StepHeader title={t("PickAddOns")} description={t("PickAddOnsDes")} />
      <Alert
        visible={!!error}
        title={t("error")}
        message={error}
        onClose={() => setError(undefined)}
      />
      {isLoading && (
        <div className="text-center">
          <OrbitProgress
            dense
            color="#32cd32"
            size="large"
            text={t("Loading")}
            textColor=""
          />
        </div>
      )}
      <form onSubmit={handleSubmit}>
        {addOnsList.map((addOn) => (
          <label
            key={addOn.name}
            htmlFor={addOn.name}
            className={`flex items-center h-full p-3 mb-2 rounded-lg border cursor-pointer select-none ${
              checkedItems.some((item) => item === addOn.id)
                ? "bg-background border-border-input"
                : ""
            }`}
          >
            <input
              id={addOn.name}
              type="checkbox"
              name={addOn.name}
              className="w-4 h-4 bg-gray-100 border-gray-300 rounded mx-2 accent-blue-600"
              checked={checkedItems.some((item) => item === addOn.id)}
              onChange={() => handleCheckboxChange(addOn.id)}
            />
            <div className="flex justify-between items-center w-full">
              <div className="px-2">
                <h3 className="font-bold text-sm leading-none">
                  {addOn.label}
                </h3>
                <span className="text-light-gray text-xs">
                  {addOn.description}
                </span>
              </div>
              <div>
                <span className="text-border-input font-bold text-xs">
                  {planeType === PlaneType.yearly
                    ? `${addOn.year}`
                    : `${addOn.month}`}
                </span>
              </div>
            </div>
          </label>
        ))}
        <StepFooter prevStep={prevStep} disableNextStep={disableNextStep} />
      </form>
    </div>
  );
};
