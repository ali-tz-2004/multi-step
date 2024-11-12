import { useEffect, useState } from "react";
import ToggleButton from "../Toggle-button";
import { ISelectPlanProps } from "../../models/selectPlanProps";
import { planCards } from "../../constants/formPlan";
import { PlaneType } from "../../models/utils";

export const SelectPlan: React.FC<ISelectPlanProps> = ({
  nextStep,
  prevStep,
}) => {
  const [isToggled, setIsToggled] = useState<PlaneType>(PlaneType.monthly);

  const [planeId, setPlaneId] = useState(0);

  const handleToggle = () => {
    setIsToggled(
      isToggled == PlaneType.monthly ? PlaneType.yearly : PlaneType.monthly
    );
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (nextStep) {
      localStorage.setItem("planeId", planeId.toString());
      localStorage.setItem("planeType", isToggled.toString());
      nextStep();
    }
  };

  const changeValuePlanHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setPlaneId(+e.currentTarget.value);
  };

  useEffect(() => {
    const storedPlaneId = localStorage.getItem("planeId");
    setPlaneId(storedPlaneId ? +storedPlaneId : 0);

    const storedPlaneType = localStorage.getItem("planeType");
    setIsToggled(storedPlaneType ? +storedPlaneType : PlaneType.monthly);
  }, []);

  return (
    <div className="text-start">
      <h1 className="font-bold text-3xl">طرح خود را انتخاب کنید</h1>
      <span className="opacity-50 text-black text-xs">
        <span className="opacity-50 text-black text-xs">
          شما می توانید صورتحساب ماهانه یا سالانه را داشته باشید.
        </span>
      </span>
      <br />
      <br />
      <form onSubmit={handleSubmit}>
        <div className="flex justify-between w-full gap-4 flex-col md:flex-row">
          {planCards.map((plane, index) => (
            <div className="flex-1" key={index}>
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
                className="block p-4 border rounded-lg cursor-pointer peer-checked:bg-background peer-checked:border-borderInput"
              >
                <div className="flex items-start md:block">
                  {plane.icon}
                  <div>
                    <h3 className="font-bold text-lg md:pt-6 pr-2 md:pr-0">
                      {plane.title}
                    </h3>
                    {isToggled == PlaneType.monthly && (
                      <span className="opacity-50 text-black text-xs">
                        {plane.month}
                      </span>
                    )}
                    {isToggled == PlaneType.yearly && (
                      <>
                        <span className="opacity-50 text-black text-xs block">
                          {plane.year}
                        </span>
                        <span className="opacity-50 text-black text-xs block">
                          {plane.messageFree}
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
              onToggle={handleToggle}
              isToggled={isToggled}
              label1="ماهانه"
              label2="سالانه"
            />
          </div>
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
            مرحله بعدی
          </button>
        </div>
      </form>
    </div>
  );
};
