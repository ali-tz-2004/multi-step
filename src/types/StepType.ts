export interface StepType {
  index: number;
  title: string;
  description: string;
  children: React.ReactNode;
  visible: boolean;
}
