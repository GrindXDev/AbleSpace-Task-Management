"use client";

import { useEffect, useState } from "react";

import {
  defaultSettings,
  settingsStorageKey,
  ThemeMode,
  UserSettings,
} from "@/lib/settings";

function applyTheme(theme: ThemeMode) {
  const prefersDark = window.matchMedia(
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

export function useSettings() {
  const [settings, setSettings] =
    useState<UserSettings>(defaultSettings);

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let currentSettings = defaultSettings;

    try {
      const storedValue =
        window.localStorage.getItem(
          settingsStorageKey,
        );

      if (storedValue) {
        const parsedSettings = JSON.parse(
          storedValue,
        ) as Partial<UserSettings>;

        currentSettings = {
          ...defaultSettings,
          ...parsedSettings,
        };
      }
    } catch {
      window.localStorage.removeItem(
        settingsStorageKey,
      );
    }

    setSettings(currentSettings);
    applyTheme(currentSettings.theme);
    setLoaded(true);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)",
    );

    function handleSystemThemeChange() {
      if (settings.theme === "system") {
        applyTheme("system");
      }
    }

    mediaQuery.addEventListener(
      "change",
      handleSystemThemeChange,
    );

    return () => {
      mediaQuery.removeEventListener(
        "change",
        handleSystemThemeChange,
      );
    };
  }, [settings.theme]);

  function changeTheme(theme: ThemeMode) {
    const updatedSettings: UserSettings = {
      ...settings,
      theme,
    };

    setSettings(updatedSettings);
    applyTheme(theme);

    window.localStorage.setItem(
      settingsStorageKey,
      JSON.stringify(updatedSettings),
    );
  }

  function resetSettings() {
    setSettings(defaultSettings);
    applyTheme(defaultSettings.theme);

    window.localStorage.removeItem(
      settingsStorageKey,
    );
  }

  return {
    settings,
    loaded,
    changeTheme,
    resetSettings,
  };
}