import { useEffect, useState } from "react";
import { StepFooter } from "./StepFooter";
import { getAddOns } from "../../services/AddOnsService";
import { Alert } from "../Alert";
import { AxiosError } from "axios";
import useStoreState from "../../hooks/useStoreState";
import store from "storejs";
import { PlaneType } from "../../types/PlaneType";
import { AddOnsType } from "../../types/AddOnsType";

interface IAddOnsProps {
  nextStep?: () => void;
  prevStep?: () => void;
}

export const AddOns: React.FC<IAddOnsProps> = ({ nextStep, prevStep }) => {
  const planeType = store.get("planeType") as PlaneType;
  const [addOnsList, setAddOnsList] = useState<AddOnsType[]>([]);
  const [error, setError] = useState<string>();

  const [checkedItems, setCheckedItems] = useStoreState<AddOnsType[]>(
    "checkedItems",
    []
  );

  const handleCheckboxChange = (addOn: AddOnsType) => {
    setCheckedItems((prev) => {
      const exists = prev.find((item) => item.id === addOn.id);
      return exists
        ? prev.filter((item) => item.id !== addOn.id)
        : [...prev, addOn];
    });
  };

  const handleSubmit = () => {
    if (nextStep) {
      nextStep();
      const step = store.get("step");
      if (step > 4) return;
      store.set("step", 4);
    }
  };

  const loadAddOns = async () => {
    try {
      const result = await getAddOns();
      setAddOnsList(result.data);
    } catch (e) {
      const error = e as AxiosError;
      console.error("Error fetching add-ons data:", error);
      setError(error.message);
    }
  };

  useEffect(() => {
    const storedItems = store.get("checkedItems") as AddOnsType[] | undefined;
    if (storedItems) {
      setCheckedItems(storedItems);
    }
  }, [setCheckedItems]);

  useEffect(() => {
    loadAddOns();
  }, []);

  return (
    <div>
      <h1 className="font-bold text-3xl">افزودنی ها را انتخاب کنید</h1>
      <p className="text-light-gray text-xs pb-8">
        افزونه ها به بهبود تجربه بازی شما کمک می کنند.
      </p>
      <Alert
        visible={error !== undefined}
        title="خطا"
        message={error}
        onClose={() => setError(undefined)}
      />
      <form onSubmit={handleSubmit}>
        {addOnsList.map((addOn) => (
          <label
            key={addOn.name}
            htmlFor={addOn.name}
            className={`flex items-center h-full p-2 mb-2 rounded-lg border cursor-pointer select-none ${
              checkedItems.some((item) => item.id === addOn.id)
                ? "bg-background border-border-input"
                : ""
            }`}
          >
            <input
              id={addOn.name}
              type="checkbox"
              name={addOn.name}
              className="w-4 h-4 bg-gray-100 border-gray-300 rounded ml-2 accent-blue-600"
              checked={checkedItems.some((item) => item.id === addOn.id)}
              onChange={() => handleCheckboxChange(addOn)}
            />
            <div className="flex justify-between items-center w-full">
              <div className="pr-2">
                <h3 className="font-bold text-sm">{addOn.label}</h3>
                <span className="text-light-gray text-xs">
                  {addOn.description}
                </span>
              </div>
              <div>
                <span className="text-border-input font-bold text-xs">
                  {planeType === PlaneType.yearly
                    ? `${addOn.year}/سالانه`
                    : `${addOn.month}/ماهانه`}
                </span>
              </div>
            </div>
          </label>
        ))}
        <StepFooter prevStep={prevStep} />
      </form>
    </div>
  );
};
