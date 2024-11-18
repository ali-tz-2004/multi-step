import { useEffect, useState } from "react";
import ToggleButton from "../Toggle-button";
import { StepFooter } from "./StepFooter";
import { planCards } from "../../data/SelectPlaneData";
import useStoreState from "../../hooks/useStoreState";
import store from "storejs";
import { PlaneType } from "../../types/PlaneType";
import { useTranslation } from "react-i18next";

interface ISelectPlanProps {
  nextStep?: () => void;
  prevStep?: () => void;
}

export const SelectPlan: React.FC<ISelectPlanProps> = ({
  nextStep,
  prevStep,
}) => {
  const [isToggled, setIsToggled] = useState<boolean>(true);

  const [planeType, setPlaneType] = useStoreState<PlaneType>(
    "planeType",
    PlaneType.monthly
  );

  const [planeId, setPlaneId] = useStoreState("planeId", 0);
  const { t } = useTranslation();

  const toggleHandle = () => {
    const nextIsToggled = !isToggled;
    setIsToggled(nextIsToggled);
    setPlaneType(nextIsToggled ? PlaneType.monthly : PlaneType.yearly);
  };

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (nextStep) {
      nextStep();
      const step = store.get("step");
      if (step > 3) return;
      store.set("step", 3);
    }
  };

  const changeValuePlanHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setPlaneId(+e.currentTarget.value);
  };

  useEffect(() => {
    const storedPlaneId = store.get("planeId") as number;
    setPlaneId(storedPlaneId ? +storedPlaneId : 0);

    const storedPlaneType = store.get("planeType") as PlaneType;
    setPlaneType(storedPlaneType || PlaneType.monthly);

    setIsToggled(storedPlaneType === PlaneType.monthly);
  }, []);

  return (
    <div>
      <h1 className="font-bold text-3xl">{t("SelectYourPlan")}</h1>
      <p className="text-light-gray text-xs pb-8">{t("SelectYourPlanDes")}</p>
      <form onSubmit={submit}>
        <div className="flex justify-between w-full gap-4 flex-col md:flex-row">
          {planCards.map((plane) => (
            <div className="flex-1" key={plane.id}>
              <input
                type="radio"
                id={plane.idTag}
                className="hidden peer"
                name="radio"
                value={plane.id}
                checked={planeId == plane.id}
                onChange={changeValuePlanHandler}
                required
              />
              <label
                htmlFor={plane.idTag}
                className="block p-4 border rounded-lg cursor-pointer peer-checked:bg-background peer-checked:border-border-input"
              >
                <div className="flex items-start md:block">
                  {plane.icon}
                  <div>
                    <h3 className="font-bold text-sm md:pt-6 pr-2 md:pr-0">
                      {t(plane.title)}
                    </h3>
                    {planeType == PlaneType.monthly && (
                      <span className="text-light-gray text-xs">
                        {t(plane.month)}
                      </span>
                    )}
                    {planeType == PlaneType.yearly && (
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
        </div>
        <br />
        <div className="flex">
          <div className="bg-background w-full h-10 rounded-lg">
            <ToggleButton
              onToggle={toggleHandle}
              isToggled={isToggled}
              label1={t("Monthly")}
              label2={t("Yearly")}
            />
          </div>
        </div>
        <StepFooter prevStep={prevStep} />
      </form>
    </div>
  );
};
