import { GuiProvider } from "@sk-web-gui/react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "./App.css";
import { LoaderScreen } from "./components/loader-screen/loader-screen.component";
import { useAppStore } from "./hooks/appStore";
import {
  setAssistantStoreName,
  useAssistantStore,
} from "./services/assistant-store";
import { Main } from "./views/Main";
import { shallow } from "zustand/shallow";

function App() {
  const [loaded, setLoaded] = useState<boolean>(false);

  const [setApiBaseUrl, setStream, setApikey, setInfo, setSettings] =
    useAssistantStore((state) => [
      state.setApiBaseUrl,
      state.setStream,
      state.setApikey,
      state.setInfo,
      state.setSettings,
    ]);

  const { t } = useTranslation();
  const [colorScheme, setPwa] = useAppStore(
    (state) => [state.colorScheme, state.setPwa],
    shallow
  );
  useEffect(() => {
    setApiBaseUrl(import.meta.env.VITE_INTRIC_API_BASE_URL);
    setStream(import.meta.env.VITE_STREAM_DEFAULT);
    if (import.meta.env.VITE_INTRIC_API_KEY) {
      setApikey(import.meta.env.VITE_INTRIC_API_KEY);
    }
    setSettings({
      assistantId: import.meta.env.VITE_ASSISTANT,
      hash: import.meta.env.VITE_HASH,
      app: import.meta.env.VITE_APPLICATION,
    });

    setAssistantStoreName(`sk-assistant-${import.meta.env.VITE_ASSISTANT}`);
    setInfo({
      name: t("common:assistant_name"),
    });
    setLoaded(true);
  }, [setStream, setApiBaseUrl]);

  useEffect(() => {
    window
      .matchMedia("(display-mode: standalone)")
      .addEventListener("change", () => {
        console.log("Web mode changed");
        if (window.matchMedia("(display-mode: standalone)").matches) {
          console.log("Web mode is standalone");
          setPwa(true);
        }
      });
  }, []);

  return (
    <GuiProvider colorScheme={colorScheme}>
      {loaded ? <Main /> : <LoaderScreen />}
    </GuiProvider>
  );
}

export default App;
