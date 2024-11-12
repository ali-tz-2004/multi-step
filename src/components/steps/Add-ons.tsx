import { useState } from "react";
import { addOnsList } from "../../constants/addOnsList";
import { IAddOnsProps } from "../../models/addOnsProps";

export const AddOns: React.FC<IAddOnsProps> = ({ nextStep, prevStep }) => {
  const isToggle = localStorage.getItem("isToggled") === "true";
  const [checkedItems, setCheckedItems] = useState<number[]>(() => {
    const storedItems = localStorage.getItem("checkedItems");
    return storedItems ? JSON.parse(storedItems) : [];
  });

  const handleCheckboxChange = (id: number) => {
    setCheckedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSubmit = () => {
    if (nextStep) {
      localStorage.setItem("checkedItems", JSON.stringify(checkedItems));
      nextStep();
    }
  };

  return (
    <div className="text-start">
      <h1 className="font-bold text-3xl">افزودنی ها را انتخاب کنید</h1>
      <span className="opacity-50 text-black text-sm">
        افزونه ها به بهبود تجربه بازی شما کمک می کنند.
      </span>
      <br />
      <br />
      <form onSubmit={handleSubmit}>
        {addOnsList.map((addOns) => (
          <label
            key={addOns.name}
            htmlFor={addOns.name}
            className={`flex items-center h-full p-2 mb-2 rounded-lg border cursor-pointer select-none ${
              checkedItems.includes(addOns.id)
                ? "bg-background border-borderInput"
                : ""
            }`}
          >
            <input
              id={addOns.name}
              type="checkbox"
              name={addOns.name}
              className="w-4 h-4 bg-gray-100 border-gray-300 rounded ml-2 accent-blue-600"
              checked={checkedItems.includes(addOns.id)}
              onChange={() => handleCheckboxChange(addOns.id)}
            />
            <div className="flex justify-between items-center w-full">
              <div className="pr-2">
                <h3 className="font-bold text-lg">{addOns.label}</h3>
                <span className="opacity-50 text-black text-sm">
                  {addOns.description}
                </span>
              </div>
              <div>
                <span className="text-borderInput font-bold text-sm">
                  {isToggle
                    ? `${addOns.priceYear}/سالانه`
                    : `${addOns.priceMonth}/ماهانه`}
                </span>
              </div>
            </div>
          </label>
        ))}
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
