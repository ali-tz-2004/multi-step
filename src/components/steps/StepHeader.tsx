interface StepHeaderProps {
  title: string;
  description: string;
}

export const StepHeader = ({ title, description }: StepHeaderProps) => {
  return (
    <>
      <h1 className="font-bold text-3xl">{title}</h1>
      <p className="text-light-gray text-xs pb-8">{description}</p>
    </>
  );
};
