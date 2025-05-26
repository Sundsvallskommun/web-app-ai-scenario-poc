import { cx } from "@sk-web-gui/react";
import { useAppStore } from "../hooks/appStore";
import { useTranslation } from "react-i18next";

interface DefaultLayoutProps extends React.ComponentPropsWithoutRef<"div"> {
  label?: string;
  showBackground?: boolean;
  transitionDuration?: string;
}

export const DefaultLayout: React.FC<DefaultLayoutProps> = (props) => {
  const { t } = useTranslation();
  const {
    label = t("common:app_name"),
    className,
    showBackground,
    transitionDuration = "1s",
    ...rest
  } = props;
  const highcontrast = useAppStore((state) => state.highcontrast);
  const backgroundSrc = import.meta.env.VITE_BACKGROUND_IMAGE;

  return (
    <div className="w-dvw h-dvh portrait:max-h-dvh bg-background-content text-dark-primary overflow-hidden relative">
      <div
        className={cx(
          "w-full h-full overflow-hidden bg-cover absolute top-0 left-0 right-0 bottom-0 z-0 transition-opacity",
          { ["bg-background-100 bg-blend-multiply"]: highcontrast }
        )}
        style={{
          backgroundImage: backgroundSrc ? `url(${backgroundSrc})` : undefined,
          opacity: showBackground ? (highcontrast ? 0.25 : 0.75) : 0,
          transitionDuration,
        }}
      ></div>
      <div className="flex flex-col w-full h-full overflow-hidden absolute top-0 left-0 right-0 bottom-0 z-10">
        <div
          className={cx(
            "grow shrink overflow-hidden flex w-full justify-center pb-24",
            className
          )}
          {...rest}
        />
      </div>
    </div>
  );
};
