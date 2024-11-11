export interface IStep {
  title: string;
  description: string;
  children: React.ReactNode;
}

export interface IStepperProps {
  steps: IStep[];
  currentStep: number;
  nextStep: () => void;
  prevStep: () => void;
}
