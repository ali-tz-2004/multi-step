import { useEffect, useState } from "react";
import ToggleButton from "../Toggle-button";
import { StepFooter } from "./StepFooter";
import { planCards } from "../../data/SelectPlaneData";
import useStoreState from "../../hooks/useStoreState";
import store from "storejs";
import { PlaneType } from "../../types/PlaneType";
import { useTranslation } from "react-i18next";
import { errorMessageRequired } from "../../constants/ErrorMessages";
import { StepHeader } from "./StepHeader";
import { SelectCards } from "../SelectCards";

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
  const [errorMessage, setErrorMessage] = useState("");
  const { t } = useTranslation();

  const toggleHandle = () => {
    const nextIsToggled = !isToggled;
    setIsToggled(nextIsToggled);
    setPlaneType(nextIsToggled ? PlaneType.monthly : PlaneType.yearly);
  };

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!planeId) {
      setErrorMessage(errorMessageRequired());
      return;
    }
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
  }, [setPlaneId, setPlaneType, setIsToggled]);

  return (
    <div>
      <StepHeader
        title={t("SelectYourPlan")}
        description={t("SelectYourPlanDes")}
      />
      <p className="text-red-500 text-sm">{!planeId && t(errorMessage)}</p>
      <form onSubmit={submit}>
        <div className="flex justify-between w-full gap-4 flex-col md:flex-row">
          <SelectCards
            Cards={planCards}
            ChangeCard={changeValuePlanHandler}
            ErrorMessage={errorMessage}
            Id={planeId}
            Type={planeType}
          />
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
