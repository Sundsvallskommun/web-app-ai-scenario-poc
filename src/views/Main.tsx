import { Suspense, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { shallow } from "zustand/shallow";
import { LoaderScreen } from "../components/loader-screen/loader-screen.component";
import { useAppStore } from "../hooks/appStore";
import { DefaultLayout } from "../layouts/default-layout.component";
import { useAssistantStore } from "../services/assistant-store";
import { useChat } from "../services/useChat";
import { Chat } from "./Chat";
import { End } from "./End";
import { Intro } from "./Intro";
import { ScenarioStart } from "./ScenarioStart";
import { Start } from "./Start";
import { PwaInstaller } from "./PwaInstaller";

export const Main: React.FC = () => {
  const [page, setPage] = useState<number>(0);

  const [sessionId, setSessionId, webMode, pwa] = useAppStore(
    (state) => [state.sessionId, state.setSessionId, state.webMode, state.pwa],
    shallow
  );

  const settings = useAssistantStore((state) => state.settings, shallow);

  const transitionDuration = 1000;

  const { sendQuery, history, newSession, session, done } = useChat({
    sessionId,
    settings,
  });

  const handleStartScenario = () => {
    setPage(3);
    sendQuery("1", false);
  };

  const handleRestart = () => {
    newSession();
    setPage(0);
  };

  useEffect(() => {
    newSession();
  }, []);

  const pages: React.JSX.Element[] = [
    <Start onNext={() => setPage(1)} transitionDuration={transitionDuration} />,
    <Intro transitionDuration={transitionDuration} onNext={() => setPage(2)} />,
    <ScenarioStart
      onNext={() => handleStartScenario()}
      onRestart={() => handleRestart()}
    />,
    <Chat
      history={history}
      sendQuery={sendQuery}
      done={done}
      onNext={() => setPage(4)}
    />,
    <End
      history={history}
      transitionDuration={transitionDuration}
      onRestart={() => handleRestart()}
    />,
  ];

  const showBackground: boolean[] = [true, false, true, true, true];

  const showInstaller = !webMode && !pwa && page === 0;

  const { t } = useTranslation();

  useEffect(() => {
    if (session?.id && session.id !== sessionId) {
      setSessionId(session.id);
    }
  }, [session?.id]);

  return (
    <DefaultLayout
      showBackground={!showInstaller && showBackground[page]}
      label={t("common:app_name")}
      transitionDuration={`${transitionDuration.toString()}ms`}
    >
      <main className="flex w-full overflow-hidden flex-col grow shrink h-full max-h-full justify-center items-center pb-16 gap-16 md:gap-32">
        <Suspense fallback={<LoaderScreen />}>
          {showInstaller ? <PwaInstaller /> : pages[page]}
        </Suspense>
      </main>
    </DefaultLayout>
  );
};
