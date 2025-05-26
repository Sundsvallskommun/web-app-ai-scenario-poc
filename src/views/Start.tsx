import { useTranslation } from "react-i18next";
import { WizardPageProps } from "../types/wizard-page-props.interface";
import { Button } from "@sk-web-gui/react";
import { useEffect, useState } from "react";
import { SettingsMenu } from "../components/settings-menu/settings-menu.component";

interface StartProps extends WizardPageProps {
  /**
   * Duration of the transition effect in milliseconds.
   * @default 1000
   */
  transitionDuration?: number;
}

export const Start: React.FC<StartProps> = ({ onNext, transitionDuration }) => {
  const [opacity, setOpacity] = useState<number>(0);

  const { t } = useTranslation();
  useEffect(() => {
    setTimeout(() => {
      setOpacity(1);
    }, transitionDuration);
  }, []);

  return (
    <>
      <SettingsMenu />
      <div
        className="flex flex-col gap-24 text-center justify-center items-center transition-opacity"
        style={{ opacity, transitionDuration: `${transitionDuration}ms` }}
      >
        <h1 className="text-display-1-sm md:text-display-1-md xl:text-display-1-lg m-0">
          {t("common:app_name")}
        </h1>
        <p className="text-display-3-sm md:text-display-3-md xl:text-display-3-lg mb-24">
          {t("common:scenario_name")}
        </p>
        <Button size="lg" rounded onClick={onNext}>
          {t("common:start")}
        </Button>
      </div>
    </>
  );
};
