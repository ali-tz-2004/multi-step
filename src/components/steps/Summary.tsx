import { useEffect, useState } from "react";
import { StepFooter } from "./StepFooter";
import { planCards } from "../../data/SelectPlaneData";
import store from "storejs";
import { PlaneType } from "../../types/PlaneType";
import { AddOnsType } from "../../types/AddOnsType";

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
  const [total, setTotal] = useState<number>();

  const fillPanel = (planeType: PlaneType) => {
    const planeId = store.get("planeId") as number;

    if (planeId) {
      let planeCard = planCards.find((x) => x.id == planeId);
      if (planeCard) {
        setPlane({
          title:
            planeType == PlaneType.monthly
              ? `${planeCard?.title} (ماهانه)`
              : `${planeCard?.title} (سالانه)`,
          moneyText:
            planeType == PlaneType.monthly ? planeCard?.month : planeCard?.year,
          money:
            planeType == PlaneType.monthly
              ? planeCard.moneyMonth
              : planeCard.moneyYear,
        });
      }
    }
  };

  const items: AddOnsType[] = (store.get("checkedItems") as AddOnsType[]) || [];

  const fillCheckedItem = (planeType: PlaneType) => {
    setCheckedItems([
      ...items.map((x) => ({
        title: x.label,
        moneyText:
          planeType == PlaneType.monthly
            ? `${x.month}/ماهانه`
            : `${x.year}/سالانه`,
        money: x.moneyMonth,
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

    const sum = items.reduce(
      (partialSum, a) =>
        partialSum +
        (planeType === PlaneType.monthly ? a.moneyMonth : a.moneyYear),
      0
    );

    const sumTotal = (plane?.money ?? 0) + sum;

    setTotal(sumTotal);
  }, [planeType, items, plane]);

  return (
    <form onSubmit={confirmHandler}>
      <h1 className="font-bold text-3xl">تمام کردن</h1>
      <p className="text-light-gray text-xs block pb-8">
        قبل از تأیید دوباره بررسی کنید همه چیز درست به نظر می رسد.
      </p>
      <div className="w-full bg-card-summary p-4 rounded-lg">
        <div className="flex justify-between items-center pb-4">
          <div>
            <h3 className="text-sm font-bold">{plane?.title}</h3>
            <span
              className="text-xs underline cursor-pointer text-light-gray"
              onClick={changePlaneHandler}
            >
              عوض کردن
            </span>
          </div>
          <div>
            <span className="font-bold text-xs">{plane?.moneyText}</span>
          </div>
        </div>
        <hr />
        {checkedItems.map((x, index) => (
          <div
            className="flex justify-between py-1 mt-2 overflow-hidden"
            key={index}
          >
            <span className="text-light-gray text-xs">{x.title}</span>
            <span className="text-xs">{x.moneyText}</span>
          </div>
        ))}
      </div>
      <div className="w-full p-4 flex justify-between">
        <span className="text-light-gray text-xs">{`در کل ${
          planeType == PlaneType.monthly ? "(ماهانه)" : "(سالانه)"
        }`}</span>
        <span className="text-border-input font-bold text-lg">{`${total}ت/
         ${planeType == PlaneType.monthly ? "ماهانه" : "سالانه"}
        `}</span>
      </div>
      <br />
      <StepFooter prevStep={prevStep} step={4} />
    </form>
  );
};
