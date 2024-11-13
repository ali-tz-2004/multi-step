import { useEffect, useState } from "react";
import { planCards } from "../../constants/formPlan";
import { PlaneType } from "../../models/utils";
import { addOnsList } from "../../constants/addOnsList";
import { ISummaryProps } from "../../models/summaryProps";

interface IFinalPlane {
  title: string;
  moneyText: string;
  money: number;
}

interface ICheckedItem {
  title: string;
  moneyText: string;
  money: number;
}

export const Summary: React.FC<ISummaryProps> = ({ prevStep }) => {
  const planeType = Number(localStorage.getItem("planeType")) as PlaneType;

  const [plane, setPlane] = useState<IFinalPlane>();
  const [checkedItems, setCheckedItems] = useState<ICheckedItem[]>([]);
  const [total, setTotal] = useState<number>();

  const fillPanel = (planeType: PlaneType) => {
    const planeId = localStorage.getItem("planeId");

    if (planeId) {
      let planeCard = planCards.find((x) => x.id == +planeId);
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

  const items: number[] = JSON.parse(
    localStorage.getItem("checkedItems") || "[]"
  );

  const itemList = addOnsList.filter((x) => items?.includes(x.id));

  const fillCheckedItem = (planeType: PlaneType) => {
    setCheckedItems([
      ...itemList.map((x) => ({
        title: x.label,
        moneyText:
          planeType == PlaneType.monthly
            ? `${x.month}/ماهانه`
            : `${x.year}/سالانه`,
        money: x.moneyMonth,
      })),
    ]);
  };

  useEffect(() => {
    fillPanel(planeType);
    fillCheckedItem(planeType);

    const sum = itemList.reduce(
      (partialSum, a) =>
        partialSum +
        (planeType === PlaneType.monthly ? a.moneyMonth : a.moneyYear),
      0
    );

    const sumTotal = (plane?.money ?? 0) + sum;

    setTotal(sumTotal);
  }, [planeType, itemList, plane]);

  return (
    <div className="text-start">
      <h1 className="font-bold text-3xl">تمام کردن</h1>
      <span className="opacity-50 text-black text-sm block">
        قبل از تأیید دوباره بررسی کنید همه چیز درست به نظر می رسد.
      </span>
      <br />
      <div className="w-full bg-lightGray p-4 rounded-lg">
        <div className="flex justify-between items-center pb-5">
          <div>
            <h3 className="text-xl">{plane?.title}</h3>
            <span className="text-sm underline cursor-pointer opacity-50">
              عوض کردن
            </span>
          </div>
          <div>
            <span className="font-bold text-sm">{plane?.moneyText}</span>
          </div>
        </div>
        <hr />
        {checkedItems.map((x, index) => (
          <div className="flex justify-between" key={index}>
            <span className="opacity-50 text-sm">{x.title}</span>
            <span>{x.moneyText}</span>
          </div>
        ))}
      </div>
      <div className="w-full p-4 flex justify-between">
        <span className="opacity-50 text-sm">{`در کل ${
          planeType == PlaneType.monthly ? "(ماهانه)" : "(سالانه)"
        }`}</span>
        <span>{total}</span>
      </div>

      <br />
      <div className="fixed md:static left-0 bg-white w-full p-4 bottom-0 flex justify-between md:p-0">
        <button
          type="button"
          className="px-4 py-2 text-gray-500 rounded-md"
          onClick={prevStep}
        >
          مرحله قبلی
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-white bg-foreground rounded-md"
        >
          تایید
        </button>
      </div>
    </div>
  );
};
