import { ColorSchemeMode } from "@sk-web-gui/react";
import { createJSONStorage, persist } from "zustand/middleware";
import { createWithEqualityFn } from "zustand/traditional";

interface AppStore {
  sessionId: string;
  setSessionId: (id: string) => void;
  highcontrast: boolean;
  setHighContrast: (highcontrast: boolean) => void;
  colorScheme: ColorSchemeMode;
  setColorScheme: (colorScheme: ColorSchemeMode) => void;
  webMode: boolean;
  setWebMode: (webMode: boolean) => void;
  pwa: boolean;
  setPwa: (pwa: boolean) => void;
}

export const useAppStore = createWithEqualityFn(
  persist<AppStore>(
    (set) => ({
      sessionId: "",
      setSessionId: (sessionId) => set(() => ({ sessionId })),
      highcontrast: false,
      setHighContrast: (highcontrast) => set(() => ({ highcontrast })),
      colorScheme: ColorSchemeMode.Dark,
      setColorScheme: (colorScheme) => set(() => ({ colorScheme })),
      webMode: false,
      setWebMode: (webMode) => set(() => ({ webMode })),
      pwa: false,
      setPwa: (pwa) => set(() => ({ pwa })),
    }),
    {
      name: import.meta.env.VITE_APPLICATION,
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
