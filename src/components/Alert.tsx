import { useTranslation } from "react-i18next";
import { IconClose } from "../assets/icons/IconClose";
import { Language_EN } from "../constants/Languages";

interface AlertProps {
  visible?: boolean;
  title?: string;
  message?: string;
  onClose?: () => void;
}

export const Alert = ({ visible, title, message, onClose }: AlertProps) => {
  const { i18n } = useTranslation();

  return visible ? (
    <div
      className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
      role="alert"
    >
      <strong className="font-bold">{title} </strong>
      <span className="block sm:inline">{message}</span>
      <button
        className={`absolute top-0 bottom-0 px-4 py-3 ${
          i18n.language === Language_EN ? "right-0" : "left-0"
        }`}
        onClick={onClose}
      >
        <IconClose />
      </button>
    </div>
  ) : null;
};
