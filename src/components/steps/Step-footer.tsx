import { TfootStepperProps } from "../../utils/steps/Tfoot-stepper.utils";

export const StepFooter = ({ prevStep, step }: TfootStepperProps) => {
  return (
    <div
      className={`fixed md:absolute left-0 bg-white w-full p-4 bottom-0 md:p-0 ${
        step === 1 ? "text-end" : "flex justify-between"
      }`}
    >
      <button
        type="button"
        className={`px-4 py-2 text-gray-500 rounded-md ${
          step === 1 ? "hidden" : ""
        }`}
        onClick={prevStep}
      >
        مرحله قبلی
      </button>
      <button
        type="submit"
        className="px-4 py-2 text-white bg-foreground rounded-md"
      >
        {step == 4 ? "تایید" : "مرحله بعدی"}
      </button>
    </div>
  );
};
