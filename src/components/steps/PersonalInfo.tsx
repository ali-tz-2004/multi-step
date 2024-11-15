import { useState } from "react";
import {
  errorMessageRequired,
  errorMessageValid,
} from "../../constants/ErrorMessages";
import { StepFooter } from "./StepFooter";
import { getFormInfo } from "../../data/PersonalInfoData";
import store from "storejs";
import useStoreState from "../../hooks/useStoreState";
import { ErrorMessage } from "../../types/ErrorMessage";

interface PersonalInfoProps {
  nextStep?: () => void;
}

export const PersonalInfo: React.FC<PersonalInfoProps> = ({ nextStep }) => {
  const [name, setName] = useStoreState(
    "name",
    store.get("name") ? (store.get("name") as string) : ""
  );
  const [email, setEmail] = useStoreState(
    "email",
    store.get("email") ? (store.get("email") as string) : ""
  );
  const [phone, setPhone] = useStoreState(
    "phone",
    store.get("phone") ? (store.get("phone") as string) : ""
  );

  const [errors, setErrors] = useState<ErrorMessage>({
    name: "",
    email: "",
    phone: "",
  });

  const newErrors: ErrorMessage = { name: "", email: "", phone: "" };

  const validateForm = () => {
    if (!name) newErrors.name = errorMessageRequired();
    if (!email) newErrors.email = errorMessageRequired();
    if (!phone) newErrors.phone = errorMessageRequired();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email) && email) newErrors.email = errorMessageValid();

    const phoneRegex = /^(\+98|0)?9\d{9}$/;
    if (!phoneRegex.test(phone) && phone) newErrors.phone = errorMessageValid();

    setErrors(newErrors);

    return !newErrors.name && !newErrors.email && !newErrors.phone;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validateForm() && nextStep) {
      nextStep();
      store.set("step", 2);
    }
  };

  const nameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    setErrors({ ...errors, name: "" });
  };

  const emailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setErrors({ ...errors, email: "" });
  };

  const phoneHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
    setErrors({ ...errors, phone: "" });
  };

  const formInfo = getFormInfo({
    name,
    email,
    phone,
    errors,
    handlers: { nameHandler, emailHandler, phoneHandler },
  });

  return (
    <div>
      <h1 className="font-bold text-3xl">اطلاعات شخصی</h1>
      <p className="text-light-gray text-xs pb-8">
        لطفا نام، آدرس ایمیل و شماره تلفن خود را وارد کنید.
      </p>
      <form onSubmit={handleSubmit}>
        {formInfo.map((field, index) => (
          <div key={index} className="mb-4">
            <div className="flex justify-between">
              <label className="block mb-2 text-sm">{field.labelName}</label>
              {field.errorMessage && (
                <span className="text-red-500 text-xs font-bold">
                  {field.errorMessage}
                </span>
              )}
            </div>
            <input
              type="text"
              className={`border border-gray-300 text-sm rounded-lg block w-full p-2.5 cursor-pointer ${
                field.errorMessage
                  ? "border-red-500"
                  : "focus:border-foreground"
              }`}
              placeholder={field.placeholder}
              value={field.value}
              onChange={field.changeHandler}
              maxLength={field.maxLength}
              name={field.name}
              dir="ltr"
            />
          </div>
        ))}

        <StepFooter step={1} />
      </form>
    </div>
  );
};
