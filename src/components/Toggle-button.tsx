import { IToggleButton, PlaneType } from "../utils/steps/Select-plane-utils";

const ToggleButton = ({
  isToggled,
  onToggle,
  label1,
  label2,
}: IToggleButton) => {
  return (
    <div dir="ltr" className="flex items-center justify-center">
      <h3
        className={`font-bold text-lg p-2 ${
          isToggled == PlaneType.monthly ? "" : "opacity-50"
        }`}
      >
        {label1}
      </h3>
      <button
        onClick={onToggle}
        type="button"
        className={`relative w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 bg-foreground`}
      >
        <div
          className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
            isToggled == PlaneType.yearly ? "translate-x-6" : "translate-x-0"
          }`}
        ></div>
      </button>
      <h3
        className={`font-bold text-lg p-2 ${
          isToggled == PlaneType.yearly ? "" : "opacity-50"
        }`}
      >
        {label2}
      </h3>
    </div>
  );
};

export default ToggleButton;
