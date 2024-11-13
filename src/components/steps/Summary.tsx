import { useEffect, useState } from "react";
import { planCards } from "../../constants/formPlan";
import { PlaneType } from "../../models/utils";
import { addOnsList } from "../../constants/addOnsList";
import { ISummaryProps } from "../../models/summaryProps";
import { IconThankYou } from "../icons/Icon-thank-you";

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
  const [confirm, setConfirm] = useState(false);

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

  const confirmHandler = () => {
    setConfirm(true);
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
    <>
      {!confirm ? (
        <div>
          <h1 className="font-bold text-3xl">تمام کردن</h1>
          <span className="opacity-50 text-black text-sm block">
            قبل از تأیید دوباره بررسی کنید همه چیز درست به نظر می رسد.
          </span>
          <br />
          <div className="w-full bg-lightGray p-4 rounded-lg">
            <div className="flex justify-between items-center pb-4">
              <div>
                <h3 className="text-lg">{plane?.title}</h3>
                <span
                  className="text-sm underline cursor-pointer opacity-50"
                  onClick={changePlaneHandler}
                >
                  عوض کردن
                </span>
              </div>
              <div>
                <span className="font-bold text-sm">{plane?.moneyText}</span>
              </div>
            </div>
            <hr />
            {checkedItems.map((x, index) => (
              <div
                className="flex justify-between py-1 overflow-hidden"
                key={index}
              >
                <span className="opacity-50 text-sm">{x.title}</span>
                <span>{x.moneyText}</span>
              </div>
            ))}
          </div>
          <div className="w-full p-4 flex justify-between">
            <span className="opacity-50 text-sm">{`در کل ${
              planeType == PlaneType.monthly ? "(ماهانه)" : "(سالانه)"
            }`}</span>
            <span className="text-borderInput font-bold text-lg">{`${total}ت/
         ${planeType == PlaneType.monthly ? "ماهانه" : "سالانه"}
        `}</span>
          </div>
          <br />
          <div className="fixed md:absolute left-0 bg-white w-full p-4 bottom-0 flex justify-between md:p-0">
            <button
              type="button"
              className="px-4 py-2 text-gray-500 rounded-md"
              onClick={prevStep}
            >
              مرحله قبلی
            </button>
            <button
              type="button"
              onClick={confirmHandler}
              className="px-4 py-2 text-white bg-foreground rounded-md"
            >
              تایید
            </button>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center flex-col h-full py-10 md:py-0">
          <IconThankYou />
          <h2 className="text-3xl font-bold">ممنون از شما</h2>
          <p className="text-lg text-center">
            از تأیید اشتراک شما متشکریم! امیدواریم با استفاده از پلتفرم ما لذت
            ببرید. اگر زمانی نیاز به پشتیبانی داشتید، لطفاً به ما ایمیل بزنید
            support@loremgaming.com
          </p>
        </div>
      )}
    </>
  );
};
