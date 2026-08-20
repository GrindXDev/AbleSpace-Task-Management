"use client";

import { useEffect } from "react";

const settingsStorageKey = "ablespace-settings";

type ThemeMode = "light" | "dark" | "system";

interface StoredSettings {
  theme?: ThemeMode;
}

export default function ThemeInitializer() {
  useEffect(() => {
    function applySavedTheme() {
      let theme: ThemeMode = "system";

      try {
        const storedValue =
          window.localStorage.getItem(
            settingsStorageKey,
          );

        if (storedValue) {
          const settings = JSON.parse(
            storedValue,
          ) as StoredSettings;

          theme = settings.theme ?? "system";
        }
      } catch {
        window.localStorage.removeItem(
          settingsStorageKey,
        );
      }

      const prefersDark =
        window.matchMedia(
          "(prefers-color-scheme: dark)",
        ).matches;

      const shouldUseDark =
        theme === "dark" ||
        (theme === "system" && prefersDark);

      document.documentElement.classList.toggle(
        "dark",
        shouldUseDark,
      );
    }

    applySavedTheme();

    const mediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)",
    );

    mediaQuery.addEventListener(
      "change",
      applySavedTheme,
    );

    return () => {
      mediaQuery.removeEventListener(
        "change",
        applySavedTheme,
      );
    };
  }, []);

  return null;
}