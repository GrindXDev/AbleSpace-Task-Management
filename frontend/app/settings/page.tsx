"use client";

import Sidebar from "@/components/layout/Sidebar";
import AppearanceSettings from "@/components/settings/AppearanceSettings";
import { useSettings } from "@/hooks/useSettings";

export default function SettingsPage() {
  const {
    settings,
    loaded,
    changeTheme,
    resetSettings,
  } = useSettings();

  if (!loaded) {
    return (
      <div className="flex min-h-screen bg-background">
        <Sidebar />

        <main className="flex-1 p-6">
          <div className="mx-auto h-64 max-w-3xl animate-pulse rounded-2xl bg-muted" />
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <Sidebar />

      <main className="min-w-0 flex-1">
        <header className="border-b border-border bg-card px-6 py-5">
          <h1 className="text-xl font-semibold">
            Settings
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Manage your workspace preferences.
          </p>
        </header>

        <div className="mx-auto max-w-3xl px-6 py-8">
          <AppearanceSettings
            theme={settings.theme}
            onThemeChange={changeTheme}
            onReset={resetSettings}
          />
        </div>
      </main>
    </div>
  );
}