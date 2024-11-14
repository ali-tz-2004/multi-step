export interface IPersonalInfoProps {
  nextStep?: () => void;
}

export interface IError {
  name: string;
  email: string;
  phone: string;
}

export interface IFormInfo {
  labelName: string;
  errorMessage: string;
  value: string;
  name: string;
  placeholder: string;
  maxLength: number;
  changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface IFormInfoParams {
  name: string;
  email: string;
  phone: string;
  errors: IError;
  handlers: {
    nameHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
    emailHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
    phoneHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  };
}
