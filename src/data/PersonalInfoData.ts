import { ErrorMessage } from "../types/ErrorMessage";

interface IFormInfo {
  labelName: string;
  errorMessage: string;
  value: string;
  name: string;
  placeholder: string;
  maxLength: number;
  changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface IFormInfoParams {
  name: string;
  email: string;
  phone: string;
  errors: ErrorMessage;
  handlers: {
    nameHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
    emailHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
    phoneHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  };
}

export const getFormInfo = ({
  name,
  email,
  phone,
  errors,
  handlers,
}: IFormInfoParams): IFormInfo[] => [
  {
    labelName: "PersonalInfoName",
    errorMessage: errors.name,
    value: name,
    name: "name",
    placeholder: "PersonalInfoPlaceholderName",
    maxLength: 20,
    changeHandler: handlers.nameHandler,
  },
  {
    labelName: "PersonalInfoEmail",
    errorMessage: errors.email,
    value: email,
    name: "email",
    placeholder: "PersonalInfoPlaceholderEmail",
    maxLength: 100,
    changeHandler: handlers.emailHandler,
  },
  {
    labelName: "PersonalInfoPhone",
    errorMessage: errors.phone,
    value: phone,
    name: "phone",
    placeholder: "PersonalInfoPlaceholderPhone",
    maxLength: 11,
    changeHandler: handlers.phoneHandler,
  },
];
