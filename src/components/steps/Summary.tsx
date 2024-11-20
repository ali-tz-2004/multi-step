import { useEffect, useState } from "react";
import { StepFooter } from "./StepFooter";
import { planCards } from "../../data/SelectPlaneData";
import store from "storejs";
import { PlaneType } from "../../types/PlaneType";
import { AddOnsType } from "../../types/AddOnsType";
import { useTranslation } from "react-i18next";
import { getAddOnsEn, getAddOnsFa } from "../../services/AddOnsService";
import { AxiosError } from "axios";
import { OrbitProgress } from "react-loading-indicators";

interface FinalPlaneType {
  title: string;
  moneyText: string;
  money: number;
}

interface CheckedItemType {
  title: string;
  moneyText: string;
  money: number;
}

interface SummaryProps {
  prevStep?: () => void;
  nextStep?: () => void;
}

export const Summary: React.FC<SummaryProps> = ({ prevStep, nextStep }) => {
  const planeType = store.get("planeType") as PlaneType;

  const [plane, setPlane] = useState<FinalPlaneType>();
  const [checkedItems, setCheckedItems] = useState<CheckedItemType[]>([]);
  const [addOnsList, setAddOnsList] = useState<AddOnsType[]>([]);
  const [total, setTotal] = useState<number>();
  const [isLoading, setIsLoading] = useState(true);

  const { t, i18n } = useTranslation();

  const fillPanel = (planeType: PlaneType) => {
    const planeId = store.get("planeId") as number;

    if (planeId) {
      let planeCard = planCards.find((x) => x.id === planeId);

      if (planeCard) {
        setPlane({
          title: planeCard?.title,
          moneyText:
            planeType === PlaneType.monthly
              ? planeCard?.month
              : planeCard?.year,
          money:
            planeType === PlaneType.monthly
              ? Number(t(planeCard.moneyMonth))
              : Number(t(planeCard.moneyYear)),
        });
      }
    }
  };

  const getCheckedItems: number[] =
    (store.get("checkedItems") as number[]) || [];

  const fillCheckedItem = (planeType: PlaneType) => {
    setCheckedItems([
      ...addOnsList.map((x) => ({
        title: x.label,
        moneyText: planeType === PlaneType.monthly ? `${x.month}` : `${x.year}`,
        money: planeType === PlaneType.monthly ? x.moneyMonth : x.moneyYear,
      })),
    ]);
  };

  const confirmHandler = () => {
    if (nextStep) {
      nextStep();
      store.set("step", 5);
    }
  };

  const stepBackHandler = (stepsBack = 2) => {
    for (let i = 0; i < stepsBack; i++) {
      if (prevStep) {
        prevStep();
      }
    }
  };

  const changePlaneHandler = () => {
    stepBackHandler();
  };

  useEffect(() => {
    fillPanel(planeType);
    fillCheckedItem(planeType);

    let sum = 0;
    if (addOnsList.length > 0) {
      sum = addOnsList.reduce(
        (partialSum, a) =>
          partialSum +
          (planeType === PlaneType.monthly
            ? Number(a.moneyMonth || 0)
            : Number(a.moneyYear || 0)),
        0
      );
    }

    const sumTotal = (plane?.money ?? 0) + sum;
    setTotal(sumTotal);
  }, [planeType, addOnsList, i18n.language]);

  const loadAddOns = async () => {
    try {
      const result =
        i18n.language === "fa" ? await getAddOnsFa() : await getAddOnsEn();
      setAddOnsList(result.data.filter((x) => getCheckedItems.includes(x.id)));
      setIsLoading(false);
    } catch (e) {
      const error = e as AxiosError;
      console.error("Error fetching add-ons data:", error);
      setAddOnsList([]);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadAddOns();
  }, [i18n.language]);

  return (
    <form onSubmit={confirmHandler}>
      <h1 className="font-bold text-3xl">{t("FinishingUp")}</h1>
      <p className="text-light-gray text-xs block pb-8">
        {t("FinishingUpDes")}
      </p>
      <div className="w-full bg-card-summary p-4 rounded-lg">
        <div className="flex justify-between items-center pb-4">
          <div>
            <h3 className="text-sm font-bold">{`${t(plane?.title ?? "")} ${
              planeType === PlaneType.monthly
                ? `(${t("Monthly")})`
                : `(${t("Yearly")})`
            }`}</h3>
            <span
              className="text-xs underline cursor-pointer text-light-gray"
              onClick={changePlaneHandler}
            >
              {t("Change")}
            </span>
          </div>
          <div>
            <span className="font-bold text-xs">
              {t(plane?.moneyText ?? "")}
            </span>
          </div>
        </div>
        <hr />
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
        {checkedItems.map((x, index) => (
          <div
            className="flex justify-between py-1 mt-2 overflow-hidden"
            key={index}
          >
            <span className="text-light-gray text-xs">{t(x.title)}</span>
            <span className="text-xs">{t(x.moneyText)}</span>
          </div>
        ))}
      </div>
      <div className="w-full p-4 flex justify-between">
        <span className="text-light-gray text-xs">{`${t("Total")} ${
          planeType === PlaneType.monthly ? t("PerMonth") : t("PerYear")
        }`}</span>
        <span className="text-border-input font-bold text-lg">
          {i18n.language === "fa"
            ? `${total} ${t("TypeMoney")}/ ${
                planeType === PlaneType.monthly ? t("Mo") : t("Yr")
              }`
            : `${t("TypeMoney")}${total}/ ${
                planeType === PlaneType.monthly ? t("Mo") : t("Yr")
              }`}
        </span>
      </div>
      <br />
      <StepFooter prevStep={prevStep} step={4} />
    </form>
  );
};
