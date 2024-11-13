import { useState } from "react";
import {
  errorMessageRequired,
  errorMessageValid,
} from "../../assets/errors/errorMessages";
import { IError } from "../../models/Error";
import { getFormInfo } from "../../constants/FormInfo";
import { IPersonalInfoProps } from "../../models/PersonalInfoProps";

export const PersonalInfo: React.FC<IPersonalInfoProps> = ({ nextStep }) => {
  const [name, setName] = useState(localStorage.getItem("name") ?? "");
  const [email, setEmail] = useState(localStorage.getItem("email") ?? "");
  const [phone, setPhone] = useState(localStorage.getItem("phone") ?? "");

  const [errors, setErrors] = useState<IError>({
    name: "",
    email: "",
    phone: "",
  });

  const newErrors: IError = { name: "", email: "", phone: "" };

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
      localStorage.setItem("name", name);
      localStorage.setItem("email", email);
      localStorage.setItem("phone", phone);
      nextStep();
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
      <span className="opacity-50 text-black text-xs">
        لطفا نام، آدرس ایمیل و شماره تلفن خود را وارد کنید.
      </span>
      <br />
      <br />

      <form onSubmit={handleSubmit}>
        {formInfo.map((field, index) => (
          <div key={index} className="mb-4">
            <div className="flex justify-between">
              <label className="block mb-2 text-sm font-medium">
                {field.labelName}
              </label>
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

        <div className="text-end fixed md:absolute left-0 bg-white w-full p-4 bottom-0 md:p-0">
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
