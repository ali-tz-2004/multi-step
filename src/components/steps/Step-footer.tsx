export interface TfootStepperProps {
  prevStep?: () => void;
  step?: 1 | 2 | 3 | 4;
}

export const StepFooter = ({ prevStep, step }: TfootStepperProps) => {
  return (
    <div
      className={`fixed md:absolute left-0 bg-white w-full p-4 bottom-0 md:p-0 ${
        step === 1 ? "text-end" : "flex justify-between"
      }`}
    >
      <button
        type="button"
        className={`px-4 py-2 text-light-gray rounded-md text-sm hover:text-foreground hover:font-bold ${
          step === 1 ? "hidden" : ""
        }`}
        onClick={prevStep}
      >
        مرحله قبلی
      </button>
      <button
        type="submit"
        className="px-4 py-2 text-white bg-foreground rounded-md text-sm hover:bg-hoverBtn"
      >
        {step == 4 ? "تایید" : "مرحله بعدی"}
      </button>
    </div>
  );
};
