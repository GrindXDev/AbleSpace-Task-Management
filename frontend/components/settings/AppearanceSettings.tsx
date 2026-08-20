"use client";

import type { ThemeMode } from "@/lib/settings";

interface AppearanceSettingsProps {
  theme: ThemeMode;
  onThemeChange: (theme: ThemeMode) => void;
  onReset: () => void;
}

const themeOptions: {
  value: ThemeMode;
  label: string;
  description: string;
  icon: string;
}[] = [
  {
    value: "light",
    label: "Light",
    description: "Always use the light appearance.",
    icon: "☀",
  },
  {
    value: "dark",
    label: "Dark",
    description: "Always use the dark appearance.",
    icon: "☾",
  },
  {
    value: "system",
    label: "System",
    description: "Match your device appearance.",
    icon: "◐",
  },
];

export default function AppearanceSettings({
  theme,
  onThemeChange,
  onReset,
}: AppearanceSettingsProps) {
  return (
    <section className="rounded-2xl border border-border bg-card p-6 text-card-foreground shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-base font-semibold">
            Appearance
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Choose how AbleSpace looks on your device.
          </p>
        </div>

        <button
          type="button"
          onClick={onReset}
          className="rounded-lg border border-border bg-background px-3 py-2 text-sm font-medium transition hover:bg-muted"
        >
          Reset
        </button>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {themeOptions.map((option) => {
          const selected = theme === option.value;

          return (
            <button
              key={option.value}
              type="button"
              onClick={() =>
                onThemeChange(option.value)
              }
              className={`rounded-xl border p-4 text-left transition ${
                selected
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-background hover:bg-muted"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xl">
                  {option.icon}
                </span>

                {selected && (
                  <span className="text-sm">✓</span>
                )}
              </div>

              <p className="mt-4 text-sm font-semibold">
                {option.label}
              </p>

              <p
                className={`mt-1 text-xs ${
                  selected
                    ? "text-primary-foreground/75"
                    : "text-muted-foreground"
                }`}
              >
                {option.description}
              </p>
            </button>
          );
        })}
      </div>
    </section>
  );
}