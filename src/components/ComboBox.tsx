import React, { useEffect, useRef, useState } from "react";
import { IconArrowDown } from "../assets/icons/IconArrowDown";
import { IdTitleType } from "../types/IdTitleType";
import { useTranslation } from "react-i18next";

interface ComboBoxProps {
  options: IdTitleType[];
  label?: React.ReactNode;
  defaultValue?: IdTitleType;
  onSelect: (value: IdTitleType) => void;
}

const ComboBox: React.FC<ComboBoxProps> = ({
  options,
  label,
  defaultValue,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<IdTitleType>();
  const comboBoxRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (option: IdTitleType) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      comboBoxRef.current &&
      !comboBoxRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (defaultValue) setSelectedOption(defaultValue);
  }, [defaultValue]);

  return (
    <div ref={comboBoxRef} className="w-full max-w-xs flex">
      {label && <div className="p-1">{label}</div>}
      <button
        type="button"
        className="w-full bg-background border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 relative"
        onClick={toggleDropdown}
      >
        <p className="text-center">
          {t(selectedOption?.title ?? "") || t("Select")}
        </p>
        <span className="absolute inset-y-0 right-0 flex items-center pointer-events-none">
          <IconArrowDown />
        </span>
        {isOpen && options.length > 0 && (
          <ul className="absolute z-10 mt-1 w-full bg-background border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto text-center left-0">
            {options.map((option) => (
              <li
                key={option.id}
                className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-blue-500 hover:text-white"
                onClick={() => handleSelect(option)}
              >
                {t(option.title)}
              </li>
            ))}
          </ul>
        )}
      </button>
    </div>
  );
};

export default ComboBox;
