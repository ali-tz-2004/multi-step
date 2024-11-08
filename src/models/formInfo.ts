export interface IFormInfo {
  labelName: string;
  errorMessage: string;
  value: string;
  name: string;
  placeholder: string;
  maxLength: number;
  changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
