import { useState } from "react";
import ToggleButton from "../Toggle-button";
import { ISelectPlanProps } from "../../models/selectPlanProps";
import { planCards } from "../../constants/formPlan";

export const SelectPlan: React.FC<ISelectPlanProps> = ({
  nextStep,
  prevStep,
}) => {
  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (nextStep) {
      nextStep();
    }
  };

  return (
    <div className="text-start">
      <h1 className="font-bold text-3xl">طرح خود را انتخاب کنید</h1>
      <span className="opacity-50 text-black text-xs">
        <span className="opacity-50 text-black text-xs">
          شما می توانید صورتحساب ماهانه یا سالانه را داشته باشید
        </span>
      </span>
      <br />
      <br />
      <form onSubmit={handleSubmit}>
        <div className="flex justify-between w-full gap-4">
          {planCards.map((plane, index) => (
            <div className="flex-1" key={index}>
              <input
                type="radio"
                id={plane.id}
                className="hidden peer"
                name="radio"
              />
              <label
                htmlFor={plane.id}
                className="block p-4 border rounded-lg cursor-pointer peer-checked:bg-background peer-checked:border-borderInput"
              >
                {plane.icon}
                <h3 className="font-bold text-lg pt-6">{plane.title}</h3>
                {!isToggled && (
                  <span className="opacity-50 text-black text-xs">
                    {plane.month}
                  </span>
                )}
                {isToggled && (
                  <>
                    <span className="opacity-50 text-black text-xs block">
                      {plane.year}
                    </span>
                    <span className="opacity-50 text-black text-xs block">
                      {plane.messageFree}
                    </span>
                  </>
                )}
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
