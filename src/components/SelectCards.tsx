import { useTranslation } from "react-i18next";
import { PlanCards } from "../data/SelectPlaneData";
import { PlaneType } from "../types/PlaneType";

interface SelectCardsProps {
  Cards: PlanCards[];
  Id: number;
  ChangeCard: (e: React.FormEvent<HTMLInputElement>) => void;
  ErrorMessage: string;
  Type: PlaneType;
}

export const SelectCards = ({
  Cards,
  Id,
  ChangeCard,
  ErrorMessage,
  Type,
}: SelectCardsProps) => {
  const { t } = useTranslation();

  return (
    <>
      {Cards.map((plane) => (
        <div className="flex-1" key={plane.id}>
          <input
            type="radio"
            id={plane.idTag}
            className="hidden peer"
            name="planes"
            value={plane.id}
            checked={Id === plane.id}
            onChange={ChangeCard}
          />
          <label
            htmlFor={plane.idTag}
            className={`block p-4 border rounded-lg cursor-pointer peer-checked:bg-background peer-checked:border-border-input
              ${!Id && ErrorMessage ? "border-red-500" : ""}
              `}
          >
            <div className="flex items-start md:block">
              {plane.icon}
              <div className="px-2 md:px-0">
                <h3 className="font-bold text-sm md:pt-6 md:pr-0">
                  {t(plane.title)}
                </h3>
                {Type === PlaneType.monthly && (
                  <span className="text-light-gray text-xs">
                    {t(plane.month)}
                  </span>
                )}
                {Type === PlaneType.yearly && (
                  <>
                    <span className="text-light-gray text-xs block">
                      {t(plane.year)}
                    </span>
                    <span className="text-light-gray text-xs block">
                      {t(plane.messageFree ?? "")}
                    </span>
                  </>
                )}
              </div>
            </div>
          </label>
        </div>
      ))}
    </>
  );
};
