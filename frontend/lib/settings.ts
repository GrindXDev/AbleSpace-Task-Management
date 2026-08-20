export type ThemeMode =
  | "light"
  | "dark"
  | "system";

export interface UserSettings {
  theme: ThemeMode;
}

export const defaultSettings: UserSettings = {
  theme: "system",
};

export const settingsStorageKey =
  "ablespace-settings";