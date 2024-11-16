import { PlaneType } from "../types/PlaneType";

interface ToggleButtonProps {
  isToggled: boolean;
  onToggle: () => void;
  label1?: string;
  label2?: string;
}

const ToggleButton = ({
  isToggled,
  onToggle,
  label1,
  label2,
}: ToggleButtonProps) => {
  return (
    <div dir="ltr" className="flex items-center justify-center">
      <h3 className={`font-bold p-2 ${isToggled ? "" : "text-light-gray"}`}>
        {label1}
      </h3>
      <button
        onClick={onToggle}
        type="button"
        className={`relative w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 bg-foreground`}
      >
        <div
          className={`w-4 h-4 bg-toggle-color rounded-full shadow-md transform transition-transform duration-300 ${
            !isToggled ? "translate-x-6" : "translate-x-0"
          }`}
        ></div>
      </button>
      <h3 className={`font-bold p-2 ${!isToggled ? "" : "text-light-gray"}`}>
        {label2}
      </h3>
    </div>
  );
};

export default ToggleButton;
