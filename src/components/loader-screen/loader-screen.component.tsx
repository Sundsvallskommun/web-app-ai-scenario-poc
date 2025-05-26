import { Spinner } from "@sk-web-gui/react";

export const LoaderScreen: React.FC = () => {
  return (
    <div className="w-full h-full grow flex justify-center items-center">
      <Spinner />
    </div>
  );
};
