import { IFormInfoParams, IFormInfo } from "../models/Personal-info-model";

export const getFormInfo = ({
  name,
  email,
  phone,
  errors,
  handlers,
}: IFormInfoParams): IFormInfo[] => [
  {
    labelName: "نام",
    errorMessage: errors.name,
    value: name,
    name: "name",
    placeholder: "ali",
    maxLength: 20,
    changeHandler: handlers.nameHandler,
  },
  {
    labelName: "ایمیل",
    errorMessage: errors.email,
    value: email,
    name: "email",
    placeholder: "ali@gmail.com",
    maxLength: 100,
    changeHandler: handlers.emailHandler,
  },
  {
    labelName: "شماره تلفن",
    errorMessage: errors.phone,
    value: phone,
    name: "phone",
    placeholder: "0914 5000 200",
    maxLength: 11,
    changeHandler: handlers.phoneHandler,
  },
];
